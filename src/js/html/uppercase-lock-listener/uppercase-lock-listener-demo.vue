<template>
  <div class="wrapper">
    <p>请任意输入字母，从而判断大写锁是否锁定</p>
    <el-input
      v-model="text"
      type="password"
      size="mini"
    />
    <span
      v-if="!isUppercase && text"
      style="color: green"
    >大写锁未锁定</span>
    <span
      v-if="isUppercase && text"
      style="color: red"
    >大写锁已锁定</span>
  </div>
</template>

<script>
import UppercaseLockListener from './uppercase-lock-listener';

export default {
  name: 'UppercaseLockListenerDemo',
  data(){
    return {
      text: '',
      isUppercase: false,
      UppercaseLockListenerCase: null
    };
  },
  mounted(){
    this.UppercaseLockListenerCase = new UppercaseLockListener({
      upCallback:()=>{
        this.isUppercase = true;
      },
      lowCallback:()=>{
        this.isUppercase = false;
      }
    });
  },
  beforeDestroy() {
    this.UppercaseLockListenerCase.destroy();
  }
};
</script>

<style scoped>
.wrapper{
  width: 500px;
  height: 500px;
}
</style>
