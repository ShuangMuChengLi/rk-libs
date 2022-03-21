<template>
  <div>
    <h1
      class="animate__animated"
      :class="c"
    >
      An animated element
    </h1>
    <div>
      <el-button
        type="primary"
        @click="change"
      >
        改变
      </el-button>
    </div>
  </div>
</template>

<script>
import 'animate.css';
export default {
  name: 'AnimateDemo',
  data(){
    return {
      c: 'animate__backOutRight'
    };
  },
  methods:{
    change(){
      if(!this.c || this.c === 'animate__backOutRight'){
        this.c = 'animate__backInRight';
      }else{
        this.c = 'animate__backOutRight';
      }
    }
  }
};
</script>

<style scoped>
</style>
