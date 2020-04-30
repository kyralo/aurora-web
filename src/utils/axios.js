/**
 *
 * ajax全局配置
 *
 */
import axios from 'axios';
import { history } from '@utils/history';

// axios 配置
axios.defaults.timeout = 5000; //响应时间

// 设置携带cookie信息
// axios.defaults.withCredentials=true;

// 当实例创建时设置默认配置
axios.defaults.baseURL = 'http://localhost:9988/api/v2';


// 默认请求头设置
// axios.defaults.headers['Cache-Control'] = 'no-cache';

//http request 拦截器

    // let token  = window.localStorage.getItem('authorization');
    // if (token) {
    //     config.headers.authorization = token
    // }

axios.interceptors.request.use(config => {
    return config
}, (error) => {
    return Promise.reject(error);
});

//http response 拦截器:返回状态判断（添加响应拦截器）
axios.interceptors.response.use(
    response => {
        let token = response.headers.authorization;
        
        if (token) {
            window.localStorage.setItem('Authorization', token);
        }
        return response.data;
    },
    error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // 返回 401 (未授权) 清除 token 并跳转到登录页面
              window.localStorage.removeItem('Authorization')
              // history.replace('/login')
            case 404:
              return error.response.data;
          }
        }
        return Promise.reject(error.response) // 返回接口返回的错误信息
    }
);

export default axios;