"use server";
import "./index.css";
import {listQuestionVoByPageEsUsingPost, listQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";

export default async function QuestionPage({searchParams}) {
    const { q: searchText } = searchParams;
    let defaultQuestionList = [];
    try {
        const res = await listQuestionVoByPageEsUsingPost({
            sortField: 'createTime',
            sortOrder: 'descend',
            pageSize: 200,
            searchText: searchText,
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
            <QuestionTable defaultQuestionList={defaultQuestionList} searchText={searchText}></QuestionTable>
        </div>
    )
}