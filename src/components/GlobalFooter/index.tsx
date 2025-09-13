import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 *
 * @author ricesjon
 */
export default function GlobalFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="global-footer">
            <div>© {currentYear} 面试刷题平台</div>
            <div>
                <a href="https://github.com/ricejson" target="_blank">
                    作者：程序员米饭
                </a>
            </div>
        </div>
    );
}
