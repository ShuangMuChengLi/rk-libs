// 自定义限制字段
function replaceCustomFun(list, val) {
  for(let item of list) {
    if(item === 'symbol') val = val.replace(/[`~!@#$%^&*()_\-+=<>?:"{}.|,\/;‘\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '');
    if(item === 'letter') val = val.replace(/[qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM]/g, '');
    if(item === 'number') val = val.replace(/[0123456789]/g, '');
    if(item === 'chinese') val = val.replace(/[^\x00-\xff]/g, '');
  }
  return(val);
}
// 预设限制字段
function replaceNormalFun(item, val) {
  if(item === 'ip') {
    val = val.replace(/[`~!@#$%^&*()_\-+=qwertyuiopasdfghjklzxcvbnm<>?:"{}|,\/;‘\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '');
    val = val.replace(/[^\x00-\xff]/g, '');
    return(val);
  }
  if(item === 'phone') {
    val = val.replace((/[`~!@#$%^&*()_\-+=qwertyuiopasdfghjklzxcv.bnm<>?:"{}|,\/;‘\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, ''));
    val = val.replace(/[^\x00-\xff]/g, '');
    return(val);
  }
  if(item === 'idCard') {
    val = val.replace((/[`~!@#$%^&*()_\-+=qwertyuiopasdfghjklzxcv.bnm<>?:"{}|,\/;‘\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, ''));
    val = val.replace(/[^\x00-\xff]/g, '');
    return(val);
  }
}
// 表单校验IP
function checkIp(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入IP地址'));
  }
  setTimeout(() => {
    if (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/i.test(value) === false) {
      
      callback(new Error('请输入正确的IP地址'));
    } else {
      callback();
    }
  }, 1000);
}
// 表单校验联系电话
function checkPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入联系电话' + this.mark));
  }
  setTimeout(() => {
    if (/^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i.test(value) === false) {
      callback(new Error('请输入正确的联系电话' + this.mark));
    } else {
      callback();
    }
  }, 1000);  
}
// 表单校验身份证号
function checkIdCard(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入身份证号'));
  }
  setTimeout(() => {
    if(value.length !== 18) {
      return callback(new Error('请输入正确的身份证号'));
    }
    if (value.length === 18) {
      // 1 "验证通过!", 0 //校验不通过 // value为身份证号码
      let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
      //号码规则校验
      if (!format.test(value)) {
        return callback(new Error('请输入正确的身份证号'));
      }
      //区位码校验
      //出生年月日校验  前正则限制起始年份为1900;
      let year = value.substr(6, 4), //身份证年
        month = value.substr(10, 2), //身份证月
        date = value.substr(12, 2), //身份证日
        sexNum = value.split(14, 3), //性别
        time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
        now_time = Date.parse(new Date()), //当前时间戳
        dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
      if (time > now_time || date > dates) {
        return callback(new Error('请输入正确的身份证号'));
      }
      //校验码判断
      let c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
      let b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
      let value_array = value.split('');
      let sum = 0;
      for (let k = 0; k < 17; k++) {
        sum += parseInt(value_array[k]) * parseInt(c[k]);
      }
      if (value_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
        return callback(new Error('请输入正确的身份证号'));
      }
    }
    callback();
  }, 1000);
}
export { replaceCustomFun, replaceNormalFun, checkIp, checkPhone, checkIdCard };
