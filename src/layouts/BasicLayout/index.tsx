"use client";

import {
    DoubleRightOutlined,
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    PlusCircleFilled,
    QuestionCircleFilled,
    SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
    SettingDrawer,
} from '@ant-design/pro-components';
import {
    Button,
    ConfigProvider,
    Divider,
    Dropdown,
    Input,
    Popover,
    theme,
} from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';
import css from "styled-jsx/css";
import GlobalFooter from "@/components/GlobalFooter";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {useRouter} from "next/navigation";

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
    const { token } = theme.useToken();
    return (
        <div
            className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
            style={{
                width: '33.33%',
            }}
        >
            {props.children}
            <DoubleRightOutlined
                style={{
                    marginInlineStart: 4,
                }}
            />
        </div>
    );
};

const MenuCard = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Divider
                style={{
                    height: '1.5em',
                }}
                type="vertical"
            />
        </div>
    );
};

const SearchInput = () => {
    const { token } = theme.useToken();
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: token.colorBgTextHover,
                }}
                prefix={
                    <SearchOutlined
                        style={{
                            color: token.colorTextLightSolid,
                        }}
                    />
                }
                placeholder="搜索题目"
                variant="borderless"
            />
        </div>
    );
};

export default ({children}) => {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: true,
    });

    // 获取当前登录用户信息
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const router = useRouter();

    const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
    const [num, setNum] = useState(40);
    if (typeof document === 'undefined') {
        return <div />;
    }
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                >
                    <ProLayout
                        title={"面试刷题平台"}
                        logo={
                            <Image
                                src={"/assets/logo.png"}
                                alt={"面试刷题平台"}
                                width={32}
                                height={32}
                            />
                        }
                        prefixCls="my-prefix"
                        bgLayoutImgList={[
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                left: 85,
                                bottom: 100,
                                height: '303px',
                            },
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                bottom: -68,
                                right: -45,
                                height: '303px',
                            },
                            {
                                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                                bottom: 0,
                                left: 0,
                                width: '331px',
                            },
                        ]}
                        {...defaultProps}
                        location={{
                            pathname,
                        }}
                        token={{
                            header: {
                                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                            },
                        }}
                        siderMenuType="group"
                        menu={{
                            collapsedShowGroupTitle: true,
                        }}
                        avatarProps={{
                            src: loginUser.userAvatar || '/assets/logo.png',
                            size: 'small',
                            title: loginUser.userName || '米饭好好吃',
                            render: (props, dom) => {
                                return (
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'logout',
                                                    icon: <LogoutOutlined />,
                                                    label: '退出登录',
                                                },
                                            ],
                                        }}
                                    >
                                        {dom}
                                    </Dropdown>
                                );
                            },
                        }}
                        actionsRender={(props) => {
                            if (props.isMobile) return [];
                            return [
                                <SearchInput key="search" />,
                                <GithubFilled key="GithubFilled" />,
                            ];
                        }}
                        headerTitleRender={(logo, title, _) => {
                            const defaultDom = (
                                <a>
                                    {logo}
                                    {title}
                                </a>
                            );
                            return (
                                <>
                                    {defaultDom}
                                    <MenuCard />
                                </>
                            );
                        }}
                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    // 跳转到对应url
                                    router.push(item.path || '/welcome')
                                    setPathname(item.path || '/welcome');
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        {...settings}
                        footerRender={() => {return <GlobalFooter></GlobalFooter>}}
                    >
                        <PageContainer
                        >
                            <ProCard
                                style={{
                                    height: '200vh',
                                    minHeight: 800,
                                }}
                            >
                                {children}
                                <div />
                            </ProCard>
                        </PageContainer>
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};