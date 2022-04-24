import http from 'axios';
import {getCookie} from '../cookie-util/cookie-util';
import _ from 'lodash';
import {storageUtil} from '../storage-util/storage-util';
import {rkUrl} from '../rk-url/rk-url';
import urlUtil from 'url';
import querystring from 'querystring';
const CancelToken = http.CancelToken;
let cancelTokenSourceMap = {};
let vue;
function errorMessage(message){
  if(vue){
    vue.$message.error(message);
  }
}
function noNoneGetParams(params, isJSON, enableEmptyString) {
  let result = {};
  params = params || {};

  for (let key in params) {
    if(!enableEmptyString && params[key] === ''){
      continue;
    }

    if (
      params[key] !== null &&
      typeof params[key] !== 'undefined' ||
      params[key] === '0' ||
      params[key] === 0
    ) {
      result[key] = params[key];
    }
  }
  if (isJSON) {
    return result;
  } else {
    return rkUrl.jsonToParameter(result);
  }
}
/**
 * 构建数据格式,默认form提交
 * @param inputData 数据
 * @param inputOption  http选项
 * @returns {*}
 */
let getParams = (inputData, inputOption)=>{
  let type = typeof inputData;
  if (type === 'string') {
    return inputData;
  }
  let ContentType = inputOption && inputOption.headers && inputOption.headers['Content-Type'];
  if(!ContentType) {
    // 默认Form提交
    return noNoneGetParams(inputData, false, true);
  }
  // JSON提交
  if(ContentType.indexOf('application/json') !== -1) {
    return noNoneGetParams(inputData, true, true);
  }
  // 文件提交
  if(ContentType.indexOf('multipart/form-data') !== -1){
    return inputData;
  }
  // 默认Form提交
  return noNoneGetParams(inputData, false, true);
};

/**
 * 构建options，添加token信息
 * @param inputOptions http选项
 * @returns {*}
 */
let getOption = (inputOptions) => {
  inputOptions = _.cloneDeep(inputOptions);
  let Authorization = getCookie('access_token');

  if(!Authorization){
    return inputOptions || {};
  }
  if(!inputOptions) {
    return {
      headers: {
        'Authorization':Authorization
      }
    };
  }
  if(!inputOptions.headers){
    inputOptions.headers = {};
  }
  inputOptions.headers['Authorization'] = Authorization;
  return inputOptions;
};


/**
 * 处理异常  登录过期  跳转登录页
 * @param e
 * @param isAlert
 * @returns {boolean}
 */
function handleError(e, isAlert) {
  if(isAlert){
    if(e.response){
      errorMessage(e.response?.data?.message || e.response?.data);
    }
  }
  if (e.response?.status === 401 && window.location.href.indexOf('/#/login') === -1) {
    storageUtil.setSession('historyUrl', window.location.href);
    this.goto('/login');
  }
  // console.error(e);
  return false;
}
async function httpMethod(originUrl, url, params, type, option, methodType){
  let axiosOption = getOption(option); // 添加token
  let cancelToken = (axiosOption && axiosOption.cancelToken) || originUrl;
  const source = CancelToken.source();
  axiosOption['cancelToken'] = source.token; //添加取消请求
  if(option){
    axiosOption['timeout'] = option?.timeout || '';
  }
  if(!cancelTokenSourceMap[cancelToken]){
    cancelTokenSourceMap[cancelToken] = [];
  }
  cancelTokenSourceMap[cancelToken].push(source); // 暂存取消请求的source
  let requireArguments;
  if(methodType === 'dataMethod'){
    requireArguments = [url, params, axiosOption];
  }else{
    requireArguments = [url, axiosOption];
  }
  return await http[type](...requireArguments).then(async (res) => {
    let index = cancelTokenSourceMap[cancelToken].indexOf(source);
    if(index !== -1){
      cancelTokenSourceMap[cancelToken].splice(index, 1);
    }
    return res;

  }).catch((e) => {
    if (http.isCancel(e)) {
      // console.error('Request canceled', e.message);
      throw e;
    } else {
      // console.error(e);
      handleError(e, true);
      throw e;
    }
  });
}
/**
 * post put patch公用方法
 * @param type  方法：post、put、patch
 * @param url 路径
 * @param data 数据
 * @param option http选项
 * @returns {Promise<*>}
 */
async function dataMethod(type, url, data, option) {
  let originUrl = url;
  let params = null;
  if (data) {
    params = getParams(data, option);// 重构数据
  }
  return await httpMethod(originUrl, url, params, type, option, 'dataMethod');
}
/**
 * 往url中添加query参数
 * @param url
 * @param query
 * @returns {*}
 */
function addQueryToUrl(url, query){
  if(typeof url !== 'string')return '';

  let urlObj = urlUtil.parse(url, true);
  if(typeof query === 'string'){
    query = querystring.parse(query);
  }
  if(!urlObj.query){
    urlObj.query = query;
  }else{
    for(let key in query){
      urlObj.query[key] = query[key];
    }
  }
  delete urlObj.path;
  delete urlObj.href;
  delete urlObj.search;
  return urlUtil.format(urlObj);
}
/**
 * get delete 公用方法。将data格式化后，拼接到url后面
 * @param type  方法：get、delete
 * @param url 路径
 * @param data 数据
 * @param option http选项
 * @returns {Promise<*>}
 */
async function urlMethod(type, url, data, option) {
  let originUrl = url;
  if (data) {
    let params;
    let dataType = typeof data;
    if (dataType === 'string') {
      params = data;
    } else {
      params = noNoneGetParams(data);
    }
    url = addQueryToUrl(url, params);
  }
  return await httpMethod(originUrl, url, null, type, option, 'urlMethod');
}

export const axios = {
  /**
   * post请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  post: async (url, data, option) => dataMethod('post', url, data, option),
  /**
   * patch请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  patch: async (url, data, option) => dataMethod('patch', url, data, option),
  /**
   * put请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  put: async (url, data, option) => dataMethod('put', url, data, option),
  /**
   * get请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  get: async (url, data, option) => urlMethod('get', url, data, option),
  /**
   * delete请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  delete: async (url, data, option) => urlMethod('delete', url, data, option),
  /**
   * 终止某一个请求
   *
   * */
  cancelSingleRequest: (cancelToken) =>{
    if(!cancelTokenSourceMap) return;
    // 取消指定项
    if(!cancelTokenSourceMap[cancelToken]) return;

    for(let item of cancelTokenSourceMap[cancelToken]){
      console.error('取消一类请求');
      item.cancel('取消一类请求');
    }
    cancelTokenSourceMap[cancelToken] = [];
  },
  /**
   * 终止所有请求
   *
   * */
  cancelAllRequest: async () =>{
    if(!cancelTokenSourceMap) return;
    // 取消全部
    for(let key in cancelTokenSourceMap){
      if(!cancelTokenSourceMap.hasOwnProperty(key)) continue;

      for(let item of cancelTokenSourceMap[key]){
        item.cancel('取消所有请求');
      }
      cancelTokenSourceMap = {};
    }
  },

  /**
   *  处理并发请求,
   *
   * */
  all: async (methodsList) => {
    return await http.all(methodsList).then((res)=>{
      return res;
    }).catch((err)=>{
      // console.error(err);
      return false;
    });
  },
  /**
   * 验证返回值 200 正常.用于正常情况下的  data数据不为空   对data做验证
   * @param data
   * @param isAlert
   * @returns {null|boolean}
   */
  verifyResponse(data, isAlert) {
    if (data && data.data && data.data.code) {
      if (data.data.code === 200) {
        return data.data.result || null;
      } else {
        if(isAlert){
          errorMessage(data.data.message);
        }
        return false;
      }
    } else {
      return false;
    }
  },
  /**
   * 验证返回值 200 正常 用于正常情况下的  data数据不为空   对data做验证
   * @param data
   * @param isAlert
   * @returns {boolean}
   */
  verifyDataResponse(data, isAlert) {
    if (data && data.data) {
      if (data.data.code === 200) {
        return true;
      } else {
        if(isAlert){
          errorMessage(data.data.message);
        }
        return false;
      }
    } else {
      return false;
    }
  },
  /**
   * 处理异常  登录过期  跳转登录页
   * @returns {boolean}
   * @param error
   */
  handleResponseError(error) {
    errorMessage(error.message);
    return false;
  },
  getFileHeader() {
    return {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
  },
  getJsonHeader() {
    return {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  },
  getFormUrlencoded() {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
  },
  install(Vue){
    Vue.prototype.axios = this;
    vue = Vue.prototype;
  }
};
