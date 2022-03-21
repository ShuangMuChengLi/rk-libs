<template>
  <div>
    test
  </div>
</template>

<script>
import {menu} from '../../../config/menu';
export default {
  name: 'VideoExample',
  data() {
    return {

    };
  },
  mounted() {
    let count = 0;
    for(let item of menu){
      if(item.children){
        for(let sub of item.children){
          count += sub.children.length;
        }
      }
    }
  }
};
</script>
<style scoped lang="less">

</style>
