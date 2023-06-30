import vue from 'vue';
export const lib = {
  alert(){
    vue.prototype.$message.success('message');
  }
};
