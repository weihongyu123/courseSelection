import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';


axios.defaults.headers.post['token'] = 'application/x-www-form-urlencoded';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,// request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers!.token = getToken() || '';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;

    if (res.code !== '200') {
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
