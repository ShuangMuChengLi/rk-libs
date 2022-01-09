<template>
  <div>
    <p id="ele1">
      1
    </p>
    <p id="ele2">
      2
    </p>
    <el-button
      type="primary"
      @click="test"
    >
      测试
    </el-button>
  </div>
</template>

<script>
import { TamperProtector } from '@/js/html/tamper-protector/tamper-protector';
export default {
  name: 'TamperProtectorDemo',
  data(){
    return {
      TamperProtector: null
    };
  },
  mounted () {
    this.TamperProtector = new TamperProtector();
    this.TamperProtector.add('#ele1');
    this.TamperProtector.add('#ele2');
  },
  beforeDestroy () {
    this.TamperProtector.destroy();
  },
  methods: {
    test(){
      console.log(this.TamperProtector.list[0].offsetParent);
    }
  }
};
</script>

<style scoped>

</style>
