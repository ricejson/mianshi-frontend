"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, {useCallback, useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import store, {AppDispatch} from "@/stores";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const InitLayout: React.FC<Readonly<{
  children: React.ReactNode;
}>> = ({children}) => {
  const dispatch = useDispatch<AppDispatch>();
  const doGetUserInit = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    console.log(res)
    if (res.data) {
      // 更新用户态
      dispatch(setLoginUser(res.data));
    } else {
      // todo 测试代码，实际可删除
      setTimeout(() => {
        const testUser = { userName: "测试登录" };
        dispatch(setLoginUser(testUser));
      }, 3000);
    }
  }, []);

  // 只执行一次
  useEffect(() => {
    doGetUserInit();
  }, [])
  return <>{children}</>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                {children}
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
