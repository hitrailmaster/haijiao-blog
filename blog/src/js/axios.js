


import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";

//配置 axios 响应拦截器，一下为实例，具体请查考官方配置文档

// axios.interceptors.response.use(
//     response => {
//         if (response.data.message === "未登录或登录超时") {
//             alert("您已登录超时，请重新登陆！");
//         }
//         return response;
//     }
// )

export default axios;