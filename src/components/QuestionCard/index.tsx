"use client";
import './index.css';
import React from "react";
import {Card} from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MyViewer from "@/components/MyViewer";

interface Props {
    question: API.QuestionVO
}

const QuestionCard: React.FC = (props: Props) => {
    const { question } = props;
    return (
        <div id={"question-card"}>
            <Card>
                <Title level={1} style={{fontSize: 24}}>{question.title}</Title>
                <TagList tagList={question.tagList} />
                <div style={{marginBottom: 20}}></div>
                <MyViewer value={question.content}></MyViewer>
            </Card>
            <div style={{marginBottom: 16}}></div>
            <Card title={"推荐答案"}>
                <MyViewer value={question.answer}></MyViewer>
            </Card>
        </div>
    )
}

export default QuestionCard;