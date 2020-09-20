import axios, { AxiosInstance } from 'axios';


export const baseUrl = `http://localhost:8801`;

// 创建axios实例
const instance: AxiosInstance = axios.create();
//超时设置
instance.defaults.timeout = 50000;

instance.defaults.baseURL = baseUrl;

instance.interceptors.request.use(
    config => {
        // 统一请求头处理
        const token = localStorage.getItem('TOKEN');
        token && (config.headers.authorization = `Bearer ${token}`);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.status === 401) {
                window.location.href = "/login";
                return Promise.resolve();
            } else {
                return Promise.resolve(response.data);
            }
        } else {
            return Promise.reject(response.data);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error && error.response && error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    console.info("跳转登录页")
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    console.info("跳转登录页登陆过期")
                    // 清除token
                    localStorage.removeItem('token');
                    // store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        console.info("跳转过期")
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    console.info("404")
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    console.info("其他错误")
            }
            return Promise.reject(error.response);
        }
    }
);

const get = (url: string, params?: {}) => {
    return instance.get(url, params);
}


const post = (url: string, data?: {}, params?: {}): any => {
    return instance.post(url, data, { params });
}

export { get, post };
