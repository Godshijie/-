import axios from "axios";
//封装axios,创建一个axios实例
const request = axios.create({
    baseURL: "https://restapi.amap.com/v3/",
    timeout: 300000,
});
//设置一下拦截器 请求拦截器一般携带token 返回拦截器中可以对数据结构进行处理
request.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        return Promise.reject(err);
    }
);
export default request;
