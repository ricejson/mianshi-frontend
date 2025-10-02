import React from "react";
import {Modal} from "antd";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import useApp from "antd/es/app/useApp";
import {addQuestionBankUsingPost} from "@/api/questionBankController";

interface Props {
    visible?: boolean
    columns: ProColumns<API.QuestionBank>[]
    onCancel: () => void
    onSubmit: (values: API.QuestionBankAddRequest) => void
}

const CreateModal: React.FC = (props: Props) => {
    const { message } = useApp();
    const handleAdd = async (values: API.QuestionBankAddRequest) => {
        const res = await addQuestionBankUsingPost(values);
        const hide = message.loading('创建题库中...');
        try {
            if (res && res.code === 0) {
                message.success('创建题库成功！');
                hide();
                return true;
            }
            throw new Error('创建用题库失败！' + res?.message);
        } catch (e) {
            hide();
            message.error(e.message);
            return false;
        }
    }
    return (
        <div>
            <Modal
                title="新增题库"
                footer={null}
                open={props.visible}
                onCancel={() => {
                    props?.onCancel()
                }}
            >
                <ProTable
                    type={"form"}
                    columns={props.columns}
                    onSubmit={async (values: API.QuestionBankAddRequest) => {
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