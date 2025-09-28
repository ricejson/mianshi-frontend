"use client";
import React, {useRef} from "react";

import "./index.css"

import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Space} from 'antd';
import {listUserByPageUsingPost} from "@/api/userController";

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
        hideInForm: true,
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
    },
    {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        valueType: 'date',
        sorter: true,
        search: false,
    },
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                修改
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                删除
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    { key: 'copy', name: 'Copy' },
                    { key: 'delete', name: 'Delete' },
                ]}
            />,
        ],
    },
];

export default () => {
    return (
        <ProTable
            columns={columns}
            cardBordered
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
                        actionRef.current?.reload();
                    }}
                    type="primary"
                >
                    创建
                </Button>,
            ]}
        />
    );
}