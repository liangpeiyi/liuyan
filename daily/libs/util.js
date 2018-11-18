// util.js封装项目中的工具函数
// 比如对axios封装，写入请求地址的前缀，在业务员只只用写相对路径，这样可以灵活控制

// 另外,可以全局拦截axios返回的内容,简单处理,只需返回我们需要的数据,代码如下:
// util.js
import axios from 'axios';
// 基本配置
const Util = {
  imgPath: 'http://127.0.0.1:8011/img/',
  apiPath: 'http://127.0.0.1:8010/'
};

// Ajax 通用配置
Util.ajax = axios.create({
  baseURL: Util.apiPath
});

// 添加响应拦截器interceptors
Util.ajax.interceptors.response.use(res => {
  return res.data;
});

// 每日推荐--获取今天时间戳
Util.getTodayTime = function () {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  // console.log(date.getTime());
  return date.getTime();
};

// 每日推荐--获取今天日期
Util.prevDay = function (timestamp = (new Date()).getTime()) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 
                ? '0' + (date.getMonth() + 1)  
                : date.getMonth() + 1;
  const day = date.getDate() < 10
              ? '0' + date.getDate()
              : date.getDate();
    // console.log(year + '' + month + '' + day);
  return year + '' + month + '' + day;
};

export default Util;