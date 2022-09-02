/**
 * Created by lin on 2017/7/28.
 */
export const systemUtil = {
  vue: null,
  install(Vue) {
    this.vue = Vue.prototype;
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
  }
};
