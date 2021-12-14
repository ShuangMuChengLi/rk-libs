<template>
  <div class="wrapper">
    <input type="password">
    <span v-if="isUppercase" style="color: red">大写已锁定</span>
  </div>
</template>

<script>
import UppercaseLockListener from '../../js/html/uppercase-lock-listener/uppercase-lock-listener';

export default {
  name: 'VueTest',
  data(){
    return {
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
