import React from "react";
import {Modal} from "antd";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import useApp from "antd/es/app/useApp";
import {addQuestionUsingPost} from "@/api/questionController";

interface Props {
    visible?: boolean
    columns: ProColumns<API.Question>[]
    onCancel: () => void
    onSubmit: (values: API.QuestionAddRequest) => void
}

const CreateModal: React.FC = (props: Props) => {
    const { message } = useApp();
    const handleAdd = async (values: API.QuestionAddRequest) => {
        const res = await addQuestionUsingPost(values);
        const hide = message.loading('创建题目中...');
        try {
            if (res && res.code === 0) {
                message.success('创建题目成功！');
                hide();
                return true;
            }
            throw new Error('创建题目失败！' + res?.message);
        } catch (e) {
            hide();
            message.error(e.message);
            return false;
        }
    }
    return (
        <div>
            <Modal
                title="新增题目"
                footer={null}
                open={props.visible}
                onCancel={() => {
                    props?.onCancel()
                }}
            >
                <ProTable
                    type={"form"}
                    columns={props.columns}
                    onSubmit={async (values: API.QuestionAddRequest) => {
                        const res = await handleAdd(values);
                        if (res) {
                            props?.onSubmit(values);
                        }
                    }}
                >
                </ProTable>
            </Modal>
        </div>
    )
}

export default CreateModal;