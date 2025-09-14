import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccessEnum} from "@/access/accessEnum";

// 默认用户
const DEFAULT_USER: API.LoginUserVO = {
    userAvatar: "未登录",
    userName: "/assets/notLoginUser.png",
    userProfile: "暂无简介",
    userRole: AccessEnum.NOT_LOGIN,
}

export const loginUserSlice = createSlice({
    name: "loginUser",
    initialState: DEFAULT_USER,
    reducers: {
        setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
            return {
                ...action.payload,
            }
        }
    }
});

export const { setLoginUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;