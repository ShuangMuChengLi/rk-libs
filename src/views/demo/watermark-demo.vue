<template>
  <div>
    <el-button
      type="primary"
      @click="addWatermark"
    >
      添加水印
    </el-button>
    <el-button
      type="primary"
      @click="removeWatermark"
    >
      移除水印
    </el-button>
  </div>
</template>

<script>
import { addWatermark, removeWatermark } from '@/js/html/watermark/watermark';

export default {
  name: 'WatermarkDemo',
  mounted () {
  },
  beforeDestroy () {
    removeWatermark();
  },
  methods:{
    addWatermark(){
      addWatermark({watermark_txt: 'test'});
    },
    removeWatermark(){
      removeWatermark();
    },
  }
};
</script>

<style scoped>

</style>
