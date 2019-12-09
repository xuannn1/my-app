import axios from "axios";
// import { Message } from "element-ui";

// const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";
const BASEURL = "/api/api/v1";
// 创建axios实例
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000
});

// Add a request interceptor
service.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function(response) {
    // 响应拦截
    // let data = response.data;
    // if (data.resCode != 0) {
    //   Message.error(data.message);
    //   return Promise.reject(data);
    // }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
