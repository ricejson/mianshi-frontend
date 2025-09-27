"use client";

import {LockOutlined, MobileOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProConfigProvider, ProFormCaptcha, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {Tabs} from 'antd';
import {useState} from 'react';
import {userLoginUsingPost, userRegisterUsingPost} from "@/api/userController";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/stores";
import {setLoginUser} from "@/stores/loginUser";
import {ProForm} from "@ant-design/pro-form/lib";
import useApp from "antd/es/app/useApp";

type RegisterType = 'phone' | 'account';

const RegisterPage = () => {
    const [form] = ProForm.useForm();
    const [registerType, setRegisterType] = useState<RegisterType>('account');
    const router = useRouter();
    const {message} = useApp();

    return (
        <ProConfigProvider hashed={false}>
            <div>
                <LoginForm
                    logo="https://github.githubassets.com/favicons/favicon.png"
                    title="用户注册"
                    subTitle="可能是世界上最好的面试刷题平台"
                    form={form}
                    submitter={{
                        searchConfig: {
                            submitText: '注册'
                        }
                    }}
                    onFinish={async (values: API.UserRegisterRequest) => {
                        const resp = await userRegisterUsingPost(values)
                        try {
                            if (resp && resp?.code === 0) {
                                // 注册成功
                                message.success('注册成功！')
                                // 清空表单字段
                                form.resetFields();
                                // 跳转到登录页
                                router.replace('/user/login')
                            } else {
                                throw new Error(resp.message);
                            }
                        } catch (err: Error) {
                            // 注册失败
                            message.error(err.message);
                        }
                    }}
                >
                    <Tabs
                        centered
                        activeKey={registerType}
                        onChange={(activeKey) => setRegisterType(activeKey as RegisterType)}
                        items={[
                            { key: 'account', label: '账号密码注册' },
                            { key: 'phone', label: '手机号注册' },
                        ]}
                    />
                    {registerType === 'account' && (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
                                }}
                                placeholder={'请输入用户名'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                    strengthText:
                                        'Password should contain numbers, letters and special characters, at least 8 characters long.',
                                    statusRender: (value) => {
                                        const getStatus = () => {
                                            if (value && value.length > 12) {
                                                return 'ok';
                                            }
                                            if (value && value.length > 6) {
                                                return 'pass';
                                            }
                                            return 'poor';
                                        };
                                        const status = getStatus();
                                        if (status === 'pass') {
                                            return (
                                                <div>
                                                    强度：中
                                                </div>
                                            );
                                        }
                                        if (status === 'ok') {
                                            return (
                                                <div>
                                                    强度：强
                                                </div>
                                            );
                                        }
                                        return (
                                            <div>强度：弱</div>
                                        );
                                    },
                                }}
                                placeholder={'请输入密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="checkPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                    strengthText:
                                        'Password should contain numbers, letters and special characters, at least 8 characters long.',
                                    statusRender: (value) => {
                                        const getStatus = () => {
                                            if (value && value.length > 12) {
                                                return 'ok';
                                            }
                                            if (value && value.length > 6) {
                                                return 'pass';
                                            }
                                            return 'poor';
                                        };
                                        const status = getStatus();
                                        if (status === 'pass') {
                                            return (
                                                <div>
                                                    强度：中
                                                </div>
                                            );
                                        }
                                        if (status === 'ok') {
                                            return (
                                                <div>
                                                    强度：强
                                                </div>
                                            );
                                        }
                                        return (
                                            <div>强度：弱</div>
                                        );
                                    },
                                }}
                                placeholder={'请输入确认密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入确认密码！',
                                    },
                                ]}
                            />
                        </>
                    )}
                    {registerType === 'phone' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'} />,
                                }}
                                name="mobile"
                                placeholder={'手机号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${'获取验证码'}`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async () => {
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                        <a
                            style={{
                                float: 'right',
                                marginBottom: '10px',
                            }}
                            href={'/user/login'}
                        >
                            已有账号？去登录
                        </a>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default RegisterPage;