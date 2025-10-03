"use client";
import './index.css';
import React from "react";
import {Avatar, Card, List, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import Link from "antd/es/typography/Link";

interface Props {
    bankList: API.QuestionBankVO[]
}

const renderQuestionBankCard = (bank: API.QuestionBankVO) => {
    return (
        <Link href={`/bank/${bank.id}`}>
            <Card>
                <Meta
                    avatar={<Avatar src={bank.picture}/>}
                    title={bank.title}
                    description={<Typography.Paragraph
                        type={"secondary"}
                        ellipsis={{rows: 1}}
                        style={{marginBottom: 0}}
                    >{bank.description}</Typography.Paragraph>}
                />
            </Card>
        </Link>
    )
}

const BankList: React.FC = (props: Props) => {
    const { bankList } = props;
    return (
        <div id={"bank-list"}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                    column: 4,
                }}
                dataSource={bankList}
                renderItem={(item: API.QuestionBankVO) => (
                    <List.Item>
                        {renderQuestionBankCard(item)}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default BankList;
