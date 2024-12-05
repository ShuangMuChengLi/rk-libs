/**
 * Created by lin on 2017/7/28.
 */
import { Message } from 'element-ui';
import _ from 'lodash';
export const systemUtil = {
    /**
 * 判断某个值是否是空字符串、空对象、空数组、null、undefined、NaN中的一个,不包含数字0
 * @param {*} val
 */
    isEmpty(val) {
      let flag = false;
      const type = Object.prototype.toString.call(val);
      switch (type) {
      // 空字符串
      case '[object String]':
        if(val.trim() === '') {
          flag = true;
        }
        break;
      // null
      case '[object Null]':
        flag = true;
        break;
      // undefined
      case '[object Undefined]':
        flag = true;
        break;
      // NaN
      case '[object Number]':
        if(isNaN(val)) {
          flag = true;
        }
        break;
      // 空数组
      case '[object Array]':
        if(val.length === 0) {
          flag = true;
        }
        break;
      // 空对象
      case '[object Object]':
        if(Object.keys(val).length === 0) {
          flag = true;
        }
        break;
      }
  
      return flag;
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
    getFormHeader() {
      return {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
    },
    handleRequestError(e, isAlert) {
      if (e.response && e.response.code) {
        if (e.response.code === 401) {
          // if (window.location.href.indexOf('/#/login') === -1) {
          //   Message.error(e.response.data.message);
          // }
        } else {
          if (isAlert) {
            Message.error(e.response.data.message || '未知异常');
          }
        }
      }
      // console.error(e);
      return false;
    },
    handleRequestSuccessOrigin(data, isAlert) {
      
      if (data && data.code && data.code === 200) {
        return data;
      } else {
        if (isAlert && data && data.message) {
          Message.error(data.message);
        }
        return false;
      }
    },
    handleRequestSuccess(data, isAlert) {
      if (data && data.code) {
        if(data.code === 200){
          return data.data;
        }else if(data.code === 401){
          Message.error('登录已过期');
          window.location.href = './#/login';
          return false;
        }else{
          if (isAlert && data && data.message) {
            Message.error(data.message);
          }
          return false;
        }
      } else {
        if (isAlert && data && data.message) {
          Message.error(data.message);
        }
        return false;
      }
    },
    handleRequestSuccessForAxios(res, isAlert) {
      const data = _.get(res, 'data');
      if (data && data.code && data.code === 200) {
        return data.data;
      } else {
        if (isAlert && data && data.message) {
          Message.error(data.message);
        }
        return false;
      }
    },
    handleRequestCodeSuccess(data, isAlert) {
      console.log(data);
      if (data && data.code && data.code === 200) {
        return true;
      } else {
        if (isAlert && data && data.message) {
          Message.error(data.message);
        }
        return false;
      }
    },
    getURLData(data = {}) {
      data = _.pickBy(data, (parameter) => ![undefined, null, ''].includes(parameter));
      return data;
    },
    getFormData(data = {}) {
      data = _.pickBy(data, (parameter) => ![undefined, null, ''].includes(parameter));
      return new URLSearchParams(data).toString();
    },
    getJSONData(data = {}) {
      data = _.pickBy(data, (parameter) => ![undefined, null, ''].includes(parameter));
      return data;
    },
    validatePositiveNumber(value) {
      const val = Number(value);
      if (_.isNaN(val) || val <= 0) {
        return false;
      }
  
      return true;
    },
  /**
   *  校验elementUI表单
   * @param formRef
   * @returns {Promise<unknown>}
   */
  validateForm(formRef){
    return new Promise((resolve, reject)=>{
      formRef.validate((valid)=>{
        if(valid){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  },
  /**
   * 三分法逗号分割数字
   * @param num
   * @returns {string}
   */
  toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  },
  /**
   * blob转为base64
   * @param blob  Blob或者FIle
   * @returns {Promise<unknown>}
   */
  async blobToBase64(blob){
    return await new Promise(resolve=>{
      let oFileReader = new FileReader();
      oFileReader.onloadend = function(e) {
        resolve(e.target.result);
      };
      oFileReader.readAsDataURL(blob);
    });
  },
  /**
   * File转为base64
   * @param file File
   * @returns {Promise<minimist.Opts.unknown>}
   */
  async fileToBase64(file){
    return await this.blobToBase64(file);
  },
  /**
   * base64转为blob
   * @param data
   * @param mime
   * @returns {Blob}
   * @constructor
   */
  base64ToBlob(data, mime) {
    data = data.split(',')[1];
    data = window.atob(data);
    let ia = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i);
    }
    // canvas.toDataURL 返回的默认格式就是 image/png
    return new Blob([ia], {
      type: mime
    });
  },
  /**
   * blob转为File
   * @param bits  一个包含ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的 Array — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容。
   * @param name   表示文件名称，或者文件路径。
   * @param options   DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 "" 。
   * @returns {*}
   */
  blobToFile(bits, name, options){
    return new File(bits, name, options);
  },
  /**
   * 复制到剪切板
   * @param {*} text 
   */
  copy(text) {
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);

    this.$message.success('复制成功');
  },
};
