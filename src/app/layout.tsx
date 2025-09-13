"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, {useCallback, useEffect} from "react";

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
  const doInit = useCallback(() => {
    console.log("欢迎来到米饭的面试刷题平台");
  }, []);

  // 只执行一次
  useEffect(() => {
    doInit();
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
          <InitLayout>
            <BasicLayout>
              {children}
            </BasicLayout>
          </InitLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
