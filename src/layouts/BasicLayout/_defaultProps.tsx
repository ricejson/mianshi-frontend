import {
    ChromeFilled,
    CrownFilled,
    SmileFilled,
} from '@ant-design/icons';
import {AccessEnum} from "@/access/accessEnum";
import React from "react";

export interface MenuItem {
    path: string;
    name?: string;
    icon?: React.ReactNode
    access?: string;
    routes?: MenuItem[];
}

 const menus = {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                access: AccessEnum.NOT_LOGIN,
                name: '首页',
            },
            {
                path: '/user/login',
                access: AccessEnum.NOT_LOGIN,
            },
            {
                path: '/user/register',
                access: AccessEnum.NOT_LOGIN,
            },
            {
                path: '/bank',
                name: '题库',
                access: AccessEnum.USER,
                icon: <SmileFilled />,
            },
            {
                path: '/question',
                name: '题目',
                access: AccessEnum.USER,
                icon: <SmileFilled />,
            },
            {
                path: '/admin',
                name: '管理页',
                icon: <CrownFilled />,
                access: AccessEnum.ADMIN,
                routes: [
                    {
                        path: '/admin/user',
                        name: '用户管理',
                        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                        access: AccessEnum.ADMIN,
                    },
                    {
                        path: '/admin/bank',
                        name: '题库管理',
                        icon: <CrownFilled />,
                        access: AccessEnum.ADMIN,
                    },
                    {
                        path: '/admin/question',
                        name: '题目管理',
                        icon: <CrownFilled />,
                        access: AccessEnum.ADMIN,
                    },
                ],
            },
            {
                path: 'https://blog.csdn.net/weixin_62533201',
                name: '站主的 CSDN ',
                icon: <ChromeFilled />,
                access: AccessEnum.NOT_LOGIN,
            },
        ],
    },
    location: {
        pathname: '/',
    },
    appList: [
        {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            title: 'Ant Design',
            desc: '本网站使用到的组件库',
            url: 'https://ant.design',
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            title: 'Pro Components',
            desc: '本网站使用到的高级组件库',
            url: 'https://procomponents.ant.design/',
        },
        {
            icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
            title: 'umi',
            desc: '用于快速生成前端请求代码',
            url: 'https://umijs.org/zh-CN/docs',
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
            title: '语雀',
            desc: '知识创作与分享工具',
            url: 'https://www.yuque.com/',
        },
    ],
};

 export default menus;