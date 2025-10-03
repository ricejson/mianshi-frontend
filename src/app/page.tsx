"use server"; // 服务端渲染
import "./page.module.css";
import "./globals.css";
import Title from "antd/es/typography/Title";
import {Divider, Flex} from 'antd';
import Link from "next/link";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import BankList from "@/components/BankList";
import QuestionList from "@/components/QuestionList";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";

export default async function Home() {
    let bankList = [];
    let questionList = [];
    try {
        const res = await listQuestionBankVoByPageUsingPost({
            pageSize: 12,
            sortField: 'createTime',
            sortOrder: 'desc',
        })
        if (res && res.code === 0) {
            bankList = res.data.records ?? [];
        } else {
            throw new Error('获取题库失败！' + res?.message);
        }
        const questionRes = await listQuestionVoByPageUsingPost({
            pageSize: 12,
            sortField: 'createTime',
            sortOrder: 'desc',
        })
        if (questionRes && questionRes.code === 0) {
            questionList = questionRes.data.records ?? [];
        } else {
            throw new Error('获取题目失败！' + questionRes?.message);
        }
    } catch (e) {

    }
  return (
      <div id={"home-page"} className={"max-width-content"}>
        <Flex justify={"space-between"} align={"center"}>
          <Title
              level={3}
          >
            最新题库
          </Title>
          <Link href={"/bank"}>查看更多</Link>
        </Flex>
        <BankList bankList={bankList}></BankList>
        <Divider></Divider>
        <Flex justify={"space-between"} align={"center"}>
          <Title
              level={3}
          >
            最新题目
          </Title>
          <Link href={"/question"}>查看更多</Link>
        </Flex>
          <QuestionList questionList={questionList}></QuestionList>
      </div>

  );
}
