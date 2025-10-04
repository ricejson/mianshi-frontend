"use client";
import './index.css';
import React, {useEffect, useRef, useState} from "react";
import {ActionType, ProColumns, ProTable} from "@ant-design/pro-components";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import TagList from "@/components/TagList";
import {Form} from "antd";
import Link from "next/link";

interface Props {
    defaultQuestionList: API.QuestionVO[]
    searchText?: string
}

const QuestionTable: React.FC = (props: Props) => {
    const [questionList, setQuestionList] = useState<API.QuestionVO[]>([]);
    // 是否第一次渲染（走默认）
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const { defaultQuestionList, searchText } = props;
    useEffect(() => {
        if (defaultQuestionList && defaultQuestionList.length > 0) {
            setQuestionList(defaultQuestionList);
        }
    }, [])
    const columns: ProColumns<API.QuestionVO>[] = [
        {
            title: '名称',
            dataIndex: 'title',
            valueType: 'text',
            ellipsis: true,
            render: (text, record, _, action) => {
                return <Link href={`/question/${record.id}`}>{record.title}</Link>
            },
        },
        {
            title: '标签',
            dataIndex: 'tagList',
            valueType: 'text',
            render: (text, record, _, action) => {
                // 解析json标签数据
                return <TagList tagList={record.tagList ?? []}></TagList>
            },
        },
    ];

    const actionRef = useRef<ActionType>();
    return (
        <div id={"question-table"}>
            <ProTable
                columns={columns}
                cardBordered
                actionRef={actionRef}
                dataSource={questionList}
                form={{
                    initialValues: {
                        title: searchText,
                    }
                }}
                request={async (params: API.QuestionQueryRequest, sort, filter) => {
                    if (isFirstLoad && defaultQuestionList && defaultQuestionList.length > 0) {
                        setIsFirstLoad(false);
                        return;
                    }
                    const res = await listQuestionVoByPageUsingPost({
                        ...params,
                        ...sort,
                        ...filter
                    });
                    if (res && res?.code === 0) {
                        // 更新表格渲染数据
                        setQuestionList(res.data?.records ?? []);
                    }
                }}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    defaultValue: {
                        option: {fixed: 'right', disable: true},
                    },
                    onChange(value) {
                        console.log('value: ', value);
                    },
                }}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                pagination={{
                    pageSize: 20,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="题目列表"
            />
        </div>
    )
}

export default QuestionTable;
