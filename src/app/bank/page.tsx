"use server";

import './index.css';
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import BankList from "@/components/BankList";
import Title from "antd/es/typography/Title";

export default async function BankPage() {
    let bankList = [];
    try {
        const res = await listQuestionBankVoByPageUsingPost({
            pageSize: 200,
            sortOrder: 'desc',
            sortField: 'createTime',
        });
        if (res && res.code === 0) {
            bankList = res.data.records;
        } else {
            throw new Error('获取题库失败！' + res.message);
        }
    } catch (e) {

    }
    return (
        <div id={"bank-page"}>
            <Title level={3}>
                题库大全
            </Title>
            <BankList bankList={bankList}></BankList>
        </div>
    )
}