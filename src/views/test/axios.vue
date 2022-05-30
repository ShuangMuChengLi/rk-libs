<template>
  <div>1</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Axios',
  mounted () {
    console.log(1);
    axios.post('/url', 'test').then((res)=>{
      console.log(res);
    });
  }
};
</script>

<style scoped>

</style>
