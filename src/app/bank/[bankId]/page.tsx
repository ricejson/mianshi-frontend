"use server";
import './index.css';
import React from "react";
import {Avatar, Card} from "antd";
import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import QuestionList from "@/components/QuestionList";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const BankDetailPage: React.FC = async (props) => {
    const { bankId } = await props.params;
    // 根据bankId获取题库详情（关联题目列表）
    let questionBank = undefined;
    try {
        const res = await getQuestionBankVoByIdUsingGet({
            id: bankId,
            needQueryQuestionList: true,
        });
        if (res && res.code === 0) {
            questionBank = res.data;
        } else {
            throw new Error('获取题库详情失败！' + res.message);
        }
    } catch (e) {
        console.log(e.message);
    }
    return (
        <div id={"bank-detail"}>
            <Card title={"题库详情"} style={{marginBottom: 16}}>
                <Meta
                    avatar={<Avatar src={questionBank.picture} size={72}/>}
                    title={<Title level={3} style={{marginBottom: 0}}>{questionBank.title}</Title>}
                    description={<Paragraph type={"secondary"}>{questionBank.description}</Paragraph>}
                >
                </Meta>
            </Card>
            <Card>
                <QuestionList questionList={questionBank?.questionList ?? []}></QuestionList>
            </Card>
        </div>
    )
}

export default BankDetailPage;