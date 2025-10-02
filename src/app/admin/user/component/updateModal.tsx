"use client";

import React from "react";
import {Modal} from "antd";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import {updateUserUsingPost} from "@/api/userController";
import useApp from "antd/es/app/useApp";

interface Props {
    oldData: API.User
    columns: ProColumns<API.User>[]
    visible: boolean
    onCancel: () => void
    onSubmit: () => void
}

const UpdateModal: React.FC = (props: Props) => {

    const { message } = useApp();

    const handleUpdate = async (values: API.UserUpdateRequest) => {
        const res = await updateUserUsingPost(values);
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
            title={"更新用户"}
            footer={null}
            open={props.visible}
            onCancel={props?.onCancel}
        >
            <ProTable
                type={"form"}
                columns={props.columns}
                form={{
                    initialValues: props.oldData
                }}
                onSubmit={async (values: API.UserUpdateRequest) => {
                    console.log(values);
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