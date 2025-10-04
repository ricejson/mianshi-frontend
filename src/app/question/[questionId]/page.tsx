"use server";
import './index.css';
import React from "react";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";

const QuestionDetail: React.FC = async (props) => {
    const { questionId } = await props.params;
    let question = undefined;
    try {
        const res = await getQuestionVoByIdUsingGet({
           id: questionId,
        });
        if (res && res.code === 0) {
            question = res.data;
        } else {
            throw new Error('获取题目详情失败！' + res.message);
        }
    } catch (e) {
        console.log(e.message);
    }
    return (
        <div id={"question-detail"}>
            <QuestionCard question={question}></QuestionCard>
        </div>
    )
};

export default QuestionDetail;