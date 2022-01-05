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
import { addWatermark, removeWatermark } from './watermark';

export default {
  name: 'WatermarkDemo',
  mounted () {
    this.addWatermark();
  },
  beforeDestroy () {
    removeWatermark();
  },
  methods:{
    addWatermark(){
      addWatermark({
        watermark_txt: '水印文字',
        // 更改水印后回调，刷新页面
        disableChangeCallback(){
          window.location.reload();
        }
      });
    },
    removeWatermark(){
      removeWatermark();
    },
  }
};
</script>

<style scoped>

</style>
