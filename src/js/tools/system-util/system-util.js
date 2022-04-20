/**
 * Created by lin on 2017/7/28.
 */
export const systemUtil = {
  vue: null,
  install(Vue) {
    this.vue = Vue.prototype;
  },
  /**
   *
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
   *
   * @param num
   * @returns {string}
   */
  toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
};
