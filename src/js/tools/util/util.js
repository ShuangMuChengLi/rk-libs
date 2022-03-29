/**
 * Created by lin on 2017/7/28.
 */
export const util = {
  vue: null,
  install(Vue) {
    this.vue = Vue.prototype;
  },
  validateForm(form){
    return new Promise((resolve, reject)=>{
      form.validate((valid)=>{
        if(valid){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  },
};
export const systemUtil = util;
