"use client";
import React, {useRef, useState} from "react";

import "./index.css"

import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Space} from 'antd';
import {deleteUserUsingPost, listUserByPageUsingPost} from "@/api/userController";
import CreateModal from "@/app/admin/user/component/createModal";
import UpdateModal from "@/app/admin/user/component/updateModal";
import useApp from "antd/es/app/useApp";

export default () => {
    const [createModelOpen, setCreateModalOpen] = useState<boolean>(false);
    const [updateModelOpen, setUpdateModalOpen] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<API.User>(null);

    const { message } = useApp();

    const handleDelete = async (values: API.DeleteRequest) => {
        const res = await deleteUserUsingPost(values);
        try {
            if (res && res.code === 0) {
                message.success('删除成功！');
                return true;
            } else {
                throw new Error('删除失败！' + res.message);
            }
        } catch (e) {
            message.error(e.message);
            return false;
        }
    }

    const columns: ProColumns<API.User>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            valueType: 'text',
            width: 48,
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '头像',
            dataIndex: 'userAvatar',
            valueType: 'avatar',
            render: (dom) => (
                <Space>
                    <span>{dom}</span>
                </Space>
            ),
            hideInSearch: true,
        },
        {
            title: '账号',
            dataIndex: 'userAccount',
            valueType: 'text',
            copyable: true,
            ellipsis: true,
        },
        {
            title: '昵称',
            dataIndex: 'userName',
            valueType: 'text',
            copyable: true,
            ellipsis: true,
        },
        {
            title: '简介',
            dataIndex: 'userProfile',
            valueType: 'text',
            ellipsis: true,
        },
        {
            title: '角色',
            dataIndex: 'userRole',
            valueEnum: {
                "admin": "管理员",
                "user": "普通用户",
            },
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            valueType: 'date',
            sorter: true,
            search: false,
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: '更新时间',
            key: 'updateTime',
            dataIndex: 'updateTime',
            valueType: 'date',
            sorter: true,
            search: false,
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
                <a
                    key="edit"
                    onClick={() => {
                        setCurrentUser(record);
                        setUpdateModalOpen(true);
                    }}
                >
                    修改
                </a>,
                <a
                    key="delete"
                    onClick={async () => {
                        const success = await handleDelete(record);
                        if (success) {
                            actionRef.current?.reload();
                        }
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];

    const actionRef = useRef<ActionType>();
    return (
        <div>
            <ProTable
                columns={columns}
                cardBordered
                actionRef={actionRef}
                request={async (params: API.UserQueryRequest, sort, filter) => {
                    const res = await listUserByPageUsingPost(params);
                    console.log(res)
                    if (res && res?.code === 0) {
                        return {
                            data: res.data?.records || [],
                            success: true,
                            total: res.data?.total || 0,
                        };
                    }
                    return {
                        data: [],
                        success: false,
                        total: 0,
                    };
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
                    pageSize: 5,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="用户列表"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined/>}
                        onClick={() => {
                            setCreateModalOpen(true);
                        }}
                        type="primary"
                    >
                        创建
                    </Button>,
                ]}
            />
            <CreateModal
                columns={columns}
                visible={createModelOpen}
                onCancel={() => {
                    setCreateModalOpen(false)
                }}
                onSubmit={() => {
                    setCreateModalOpen(false);
                    // 重新加载数据
                    actionRef.current?.reload();
                }}
            />
            <UpdateModal
                oldData={currentUser}
                columns={columns}
                visible={updateModelOpen}
                onCancel={() => {
                    setUpdateModalOpen(false);
                }}
                onSubmit={() => {
                    setUpdateModalOpen(false);
                    actionRef.current?.reload();
                }}
            />

        </div>
    );
}