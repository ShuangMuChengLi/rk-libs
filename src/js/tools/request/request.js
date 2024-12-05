import axios from 'axios';
import { Message } from 'element-ui';
import _ from 'lodash';
// 创建 axios 实例
const service = axios.create({
  // 超时
  timeout: 60000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token,如果请求中自带了Authorization，就不向cookie中取
    const isToken = !!(config.headers || {}).token;
    // 在发送请求之前做些什么 token
    if (sessionStorage.getItem('token') && !isToken) {
      config.headers['token'] = sessionStorage.getItem('token'); // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    // 传参时如果为空或null，不传该字段
    // 【注】：这里不用lodash的isEmpty，因为空格和数字0无法正确判断
    // config.params = pickBy(config.params, (parameter) => !systemUtil.isEmpty(parameter));
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    //const msg = res.data.message || errorCode[code] || errorCode['default'];
    const msg = res.data.message;
    if (!res.data) {
      Message({
        message: '异常',
        type: 'error'
      });
      return Promise.reject(new Error(msg));
    }

    // 二进制数据则直接返回
    if (res.request.responseType === 'blob') {
      return res.data;
    } else if (res.request.responseType === 'arraybuffer') {
      return res;
    }

    if (code >= 200 && code < 300) {
      return res.data;
    }

    if (code === 401) {
      return errLogin(msg);
    } else {
      return res.data;
    }
  },
  (error) => {
    console.error(error);
    let { message, response } = error;
    const statusCode = parseInt(message.substr(message.length - 3));
    if (statusCode === 401) {
      return errLogin();
    }
    if (message === 'Network Error') {
      message = '连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = response.data.message || '系统接口' + statusCode + '异常';
    }
    console.log(response);
    if (response.request.responseType === 'arraybuffer') {
      return;
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

const errLogin = (msg) => {
  Message.error('登录已过期');
  window.location.href = './#/login';
  return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
};

// 导出 axios 实例
export default service;
