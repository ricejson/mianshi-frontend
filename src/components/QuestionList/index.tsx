"use client";
import './index.css';
import React from "react";
import {Card, List} from "antd";
import TagList from "@/components/TagList";
import Link from "next/link";

interface Props {
    bankList: API.QuestionVO[]
}

const QuestionList: React.FC = (props: Props) => {
    const { questionList } = props;
    return (
        <Card id={"question-list"}>
            <List
                dataSource={questionList}
                renderItem={(item: API.QuestionVO) => (
                    <Link href={`/question/${item.id}`}>
                        <List.Item extra={<TagList tagList={item.tagList}/>}>
                            <List.Item.Meta
                                title={item.title}
                                description={item.content}
                            />
                        </List.Item>
                    </Link>
                )}
            />
        </Card>
    )
}

export default QuestionList;
