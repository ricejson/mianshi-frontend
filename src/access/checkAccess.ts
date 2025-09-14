/**
 * 通用的权限校验方法
 * @author ricejson
 */
import {AccessEnum} from "@/access/accessEnum";

export const checkAccess = (loginUser: API.LoginUserVO, needAccess: string = AccessEnum.NOT_LOGIN): boolean => {
    // 获取当前用户的权限
    const userAccess = loginUser.userRole;
    if (needAccess === AccessEnum.ADMIN) {
        // 只有管理员才可以
        return userAccess === AccessEnum.ADMIN;
    }
    if (needAccess === AccessEnum.USER) {
        // 只要不是未登录就行
        return userAccess !== AccessEnum.NOT_LOGIN;
    }
    // 默认不需要登录
    return true;
};