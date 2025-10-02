"use client";

import React from "react";
import {Modal} from "antd";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import useApp from "antd/es/app/useApp";
import {updateQuestionUsingPost} from "@/api/questionController";

interface Props {
    oldData: API.Question
    columns: ProColumns<API.Question>[]
    visible: boolean
    onCancel: () => void
    onSubmit: () => void
}

const UpdateModal: React.FC = (props: Props) => {

    const { message } = useApp();

    const handleUpdate = async (values: API.QuestionUpdateRequest) => {
        const res = await updateQuestionUsingPost(values);
        try {
            if (res && res.code === 0) {
                message.success('更新成功！');
                return true;
            } else {
                throw new Error('更新失败！' + res.message);
            }
        } catch (e) {
            message.error(e.message);
            return false;
        }
    }

    return (
        <Modal
            title={"更新题目"}
            footer={null}
            open={props.visible}
        >
            <ProTable
                type={"form"}
                columns={props.columns}
                form={{
                    initialValues: props.oldData
                }}
                onCancel={props?.onCancel}
                onSubmit={async (values: API.QuestionUpdateRequest) => {
                    const success = await handleUpdate({
                        ...values,
                        id: props.oldData?.id,
                    });
                    if (success) {
                        props.onSubmit();
                    }
                }}
            >

            </ProTable>
        </Modal>
    )
}

export default UpdateModal;