"use client";

import {LockOutlined, MobileOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProConfigProvider, ProFormCaptcha, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {Tabs} from 'antd';
import {useState} from 'react';
import {userLoginUsingPost} from "@/api/userController";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/stores";
import {setLoginUser} from "@/stores/loginUser";
import {ProForm} from "@ant-design/pro-form/lib";
import useApp from "antd/es/app/useApp";

type LoginType = 'phone' | 'account';

const LoginPage = () => {
    const [form] = ProForm.useForm();
    const [loginType, setLoginType] = useState<LoginType>('account');
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {message} = useApp();

    return (
        <ProConfigProvider hashed={false}>
            <div>
                <LoginForm
                    logo="https://github.githubassets.com/favicons/favicon.png"
                    title="用户登录"
                    subTitle="可能是世界上最好的面试刷题平台"
                    form={form}
                    onFinish={async (values: API.UserLoginRequest) => {
                        const resp = await userLoginUsingPost(values)
                        if (resp && resp?.code === 0) {
                            // 登录成功
                            message.success('登录成功！')
                            // 设置登录状态
                            dispatch(setLoginUser(resp.data))
                            // 清空表单字段
                            form.resetFields();
                            router.replace('/')
                        } else {
                            // 登录失败
                            message.error('登录失败！' + resp.message)
                        }
                    }
                    }
                >
                    <Tabs
                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                        items={[
                            { key: 'account', label: '账号密码登录' },
                            { key: 'phone', label: '手机号登录' },
                        ]}
                    />
                    {loginType === 'account' && (
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
                        </>
                    )}
                    {loginType === 'phone' && (
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
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                            href={'/user/register'}
                        >
                            还没有账号？去注册
                        </a>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;