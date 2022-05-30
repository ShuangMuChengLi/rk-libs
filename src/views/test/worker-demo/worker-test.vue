<template>
  <div>
    <div
      @click="init"
    >
      test
    </div>
    worker获取到的数据：{{ data.foo }}
  </div>
</template>

<script>
import TestWorker from 'worker-loader!./test.worker.js';
// import TestWorker from './test.worker.js';
export default {
  name: 'VueTest',
  data () {
    return {
      data: {}
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init(){
      const w = new TestWorker();
      w.onmessage = (event)=>{
        this.data = event.data;
      };
      const fn = ()=>{

      };
      fn();
    },
    test(){

    }
  }
};
</script>

<style scoped>

</style>
