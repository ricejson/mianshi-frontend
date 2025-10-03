"use server";
import "./index.css";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";

export default async function QuestionPage() {
    let defaultQuestionList = [];
    try {
        const res = await listQuestionVoByPageUsingPost({
            sortField: 'createTime',
            sortOrder: 'descend',
            pageSize: 200,
        });
        if (res && res.code === 0) {
            defaultQuestionList = res.data?.records ?? [];
            console.log(defaultQuestionList);
        } else {
            throw new Error('获取题目列表失败！' + res.message);
        }
    } catch (e) {
        console.log(e)
    }
    return (
        <div id={"question-table"}>
            <QuestionTable defaultQuestionList={defaultQuestionList}></QuestionTable>
        </div>
    )
}