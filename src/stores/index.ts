import {configureStore} from "@reduxjs/toolkit";
import loginUser from "@/stores/loginUser";

const store = configureStore({
    reducer: {
        // 这里用于存放state
        loginUser,
    }
})

// 用于类型推断和提示
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;