<!--
 * @Author: zengweipeng
 * @Date: 2025-01-02 10:39:27
 * @LastEditors: zengweipeng
 * @LastEditTime: 2025-01-03 13:57:58
 * @Description: 
 * @FilePath: \manage\src\components\ImportData\components\Loading\Loading.vue
-->
<template>
  <div>
    <el-progress :percentage="percent" />
  </div>
</template>
<script>
export default {
  name: 'LoadingUpload',
  components: {
     
  },
  mixins: [],
  props: {
    percent: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
       
    };
  },
  computed: {
     
  },
  watch: {
     
  },
  mounted() {
     
  },
  methods: {
     
  }
};
</script>
<style lang='scss' scoped>
@import './Loading.scss';
</style>