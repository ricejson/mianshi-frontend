"use client";

import {GithubFilled, LogoutOutlined,} from '@ant-design/icons';
import type {ProSettings} from '@ant-design/pro-components';
import {PageContainer, ProCard, ProConfigProvider, ProLayout,} from '@ant-design/pro-components';
import {ConfigProvider, Divider, Dropdown, Input,} from 'antd';
import React, {useState} from 'react';
import defaultProps from './_defaultProps';
import GlobalFooter from "@/components/GlobalFooter";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {useRouter} from "next/navigation";
import Search from "antd/es/input/Search";
import Link from "next/link";

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
    const router = useRouter();
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
        >
            <Search onSearch={(searchText) => {
                router.push(`/question?q=${searchText}`);
            }}>
            </Search>
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
                                width={36}
                                height={36}
                                onClick={() => {
                                    router.push('/');
                                }}
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
                                <SearchInput key="search"/>,
                                <Link href={"https://github.com/ricejson"} target={"_blank"}>
                                    <GithubFilled key="GithubFilled"/>
                                </Link>,
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