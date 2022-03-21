<template>
  <div>1</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Axios',
  mounted () {
    axios.post('http://www.jianshu.com/p/3e08e0e60a29', 'test').then(()=>{

    });
  }
};
</script>

<style scoped>

</style>
