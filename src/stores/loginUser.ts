import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 默认用户
const DEFAULT_USER: API.LoginUserVO = {
    userAvatar: "未登录",
    userName: "/assets/notLoginUser.png",
    userProfile: "暂无简介",
    userRole: "guest",
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