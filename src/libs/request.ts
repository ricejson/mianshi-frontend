import axios from "axios";

/**
 * 全局通用请求
 * @author ricejson
 */
const myAxios = axios.create({
    baseURL: "http://localhost:8101",
    timeout: 10000,
    withCredentials: true, // 携带cookie参数
})

/**
 * 请求拦截器
 */
myAxios.interceptors.request.use(function (config) {
    // 请求执行前处理
    return config;
}, function (error) {
    // 请求处理错误
    return Promise.reject(error);
})

/**
 * 响应拦截器
 */
myAxios.interceptors.response.use(function (resp) {
    const { data } = resp;
    // 未登录
    console.log(data);
    if (data.code === 40100) {
        // 判断是否不需要拦截
        if (!window.location.pathname.includes("/user/login") &&
        !resp.request.responseURL.includes("user/get/login"))
        {
            window.location.href = `/user/login/redirect=${window.location.href}`
        }
    } else if (data.code !== 0) {
        // 其他错误
    }
    return data;
}, function (error) {
    return Promise.reject(error);
})

export default myAxios;