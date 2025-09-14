import React from "react";
import {RootState} from "@/stores";
import {useSelector} from "react-redux";
import {usePathname} from "next/navigation";
import findMenuItemByPath from "@/access/menus";
import menus from "@/layouts/BasicLayout/_defaultProps";
import Forbidden from "@/app/forbidden";
import {checkAccess} from "@/access/checkAccess";
import * as child_process from "child_process";

/**
 * 全局通用权限校验组件
 * @constructor
 */

export const GlobalAccess: React.FC<Readonly<{
    children: React.ReactNode;
}>> = ({children}) => {
    // 获取当前登录用户
    const loginUser = useSelector((state: RootState) => state.loginUser)
    // 获取当前path
    const pathname = usePathname();
    // 查找菜单项目
    const menuItem = findMenuItemByPath(pathname, menus.route.routes);

    if (!menuItem) {
        return <Forbidden />;
    }
    if (!checkAccess(loginUser, menuItem.access)) {
        // 权限不符合要求
        return <Forbidden />
    }
    return <>{children}</>
};