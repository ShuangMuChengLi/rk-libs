<template>
  <div>
    <p id="ele1">
      1
    </p>
    <p id="ele2">
      2
    </p>
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
};
</script>

<style scoped>

</style>
