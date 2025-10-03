import './index.css';
import React from "react";
import {Tag} from "antd";

interface Props {
    tagList: string[]
}

const TagList: React.FC = ({ tagList }: Props) => {
    return (
        tagList.map((tag) => <Tag>{tag}</Tag>)
    )
}

export default TagList;