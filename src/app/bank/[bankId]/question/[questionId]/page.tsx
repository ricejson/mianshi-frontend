"use server";
import './index.css';
import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import {Flex, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import {Content} from "antd/es/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";
import {cookies} from "next/headers";

const BankQuestionDetailPage: React.FC = async (props) => {
    const { bankId, questionId } = await props.params;
    const cookieStore = cookies();
    const mianshiCookie = cookieStore.get('mianshi')?.value;
    // 题目列表
    let questionList = undefined;
    let question = undefined;
    try {
        const res = await getQuestionBankVoByIdUsingGet({
            id: bankId,
            needQueryQuestionList: true,
        },{ headers: { Cookie: `mianshi=${mianshiCookie}` } });
        if (res && res.code === 0) {
            let questionBank = res.data;
            if (questionBank && questionBank.questionList) {
                questionList = questionBank.questionList;
            }
        } else {
            throw new Error('获取题库详情失败');
        }
    } catch (e) {
        console.log(e);
    }
    // 获取题目详情
    try {
        const res = await getQuestionVoByIdUsingGet({
            id: questionId,
        });
        if (res && res.code === 0) {
            question = res.data;
        } else {
            throw new Error('获取题目详情失败');
        }
    } catch (e) {
        console.log(e);
    }

    const menuItems = questionList.map((question) => {
        return {
            'label': <Link href={`/bank/${bankId}/question/${question.id}`}>{question.title}</Link>,
            'key': question.id,
        }
    })
    return (
        <div id={"bank-question-detail"}>
            <Flex gap={24}>
                <Sider theme={"light"}>
                    <Title level={4}>题目列表</Title>
                    <Menu selectedKeys={question.id} mode="inline" items={menuItems} />
                </Sider>
                <Content>
                    <QuestionCard question={question}></QuestionCard>
                </Content>
            </Flex>
        </div>
    )
}

export default BankQuestionDetailPage;