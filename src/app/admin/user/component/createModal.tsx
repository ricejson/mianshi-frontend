import React from "react";
import {Modal} from "antd";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import {addUserUsingPost} from "@/api/userController";
import useApp from "antd/es/app/useApp";

interface Props {
    visible?: boolean
    columns: ProColumns<API.User>[]
    onCancel: () => void
    onSubmit: (values: API.UserAddRequest) => void
}

const CreateModal: React.FC = (props: Props) => {
    const { message } = useApp();
    const handleAdd = async (values: API.UserAddRequest) => {
        const res = await addUserUsingPost(values);
        const hide = message.loading('创建用户中...');
        try {
            if (res && res.code === 0) {
                message.success('创建用户成功！');
                hide();
                return true;
            }
            throw new Error('创建用户失败！' + res?.message);
        } catch (e) {
            hide();
            message.error(e.message);
            return false;
        }
    }
    return (
        <div>
            <Modal
                destroyOnClose={true}
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
                    onSubmit={async (values: API.UserAddRequest) => {
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