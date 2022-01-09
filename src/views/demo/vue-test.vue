<template>
  <div class="wrapper" />
</template>

<script>
import _ from 'lodash';
export default {
  name: 'VueTest',
  data(){
    return {
      fn: null
    };
  },
  mounted(){
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods:{
    resize: _.debounce(function (){
      console.log('resize');
    }, 250, {maxWait: 1000})
  }
};
</script>

<style scoped>
  .wrapper{
    width: 500px;
    height: 500px;
  }
</style>
