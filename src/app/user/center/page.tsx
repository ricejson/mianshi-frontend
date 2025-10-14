"use client";
import "./index.css";
import React, {useState} from "react";
import {Avatar, Card, Col, Row} from "antd";
import Title from "antd/es/typography/Title";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import Paragraph from "antd/es/typography/Paragraph";
import SigninHeatmap from "@/app/user/center/components";

const UserCenter: React.FC = () => {
    const loginUser = useSelector((state: RootState) => state.loginUser)
    const [activeTabKey, setActiveTabKey] = useState<string>("signin");
    const tabList = [
        {
            key: 'signin',
            tab: '刷题记录',
        },
        {
            key: 'others',
            tab: '其他',
        },
    ];
    return (
        <div id={"user-center"}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                    <Card
                        style={{textAlign: "center"}}
                        title={<Title level={5} style={{marginRight: 200}}>个人信息</Title>}
                    >
                        <Avatar src={loginUser.userAvatar || '/assets/default_user.png'} size={72}></Avatar>
                        <div style={{marginBottom: 12}}></div>
                        <Card.Meta
                            title={<Title level={5} style={{marginBottom: 0}}>{loginUser.userName || '无名氏'}</Title>}
                            description={
                                <Paragraph
                                    type={"secondary"}
                                >
                                    {loginUser.userProfile || '这个人很懒，什么都没有留下'}
                                </Paragraph>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} md={18}>
                    <Card
                        tabList={tabList}
                        activeTabKey={activeTabKey}
                        onTabChange={(key) => {
                            setActiveTabKey(key);
                        }}
                    >
                        {activeTabKey === 'signin' && <SigninHeatmap />}
                        {activeTabKey === 'others' && <></>}
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default UserCenter;