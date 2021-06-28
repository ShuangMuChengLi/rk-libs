/**
 * Created by linchaoqun on 2017/4/10.
 */
export let getCookie = function (c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + '=');
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end === -1) c_end = document.cookie.length;
      return decodeURI(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
};

export let setCookie = function setCookie(c_name, value, expiredays, path) {
  let exdate = new Date();
  let cookieKeyValue = c_name + '=' + encodeURI(value);
  let expiredaysString = '';
  let pathString = '';
  if (expiredays) {
    exdate.setDate(exdate.getDate() + expiredays);
    expiredaysString = ';expires=' + exdate.toGMTString();
  }
  if(path){
    pathString = ';Path=' + path;
  }
  document.cookie = cookieKeyValue + expiredaysString + pathString;
};

export let removeCookie = function setCookie(c_name) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() - 1000);
  document.cookie = c_name + '=null;expires=' + exdate.toGMTString();
};
