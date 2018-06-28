import axios from 'axios'

axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
    // 判断localStorage中是否存在api_token
    const token = localStorage.getItem('token');
    if (token) {
        //  存在将api_token写入 request header
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}, err => {
    return Promise.reject(err);
});

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          localStorage.removeItem('token');
          window.location.href = '/#/login';
      }
    }
    return Promise.reject(error.response.data)
  });

export const axiosex = axios;