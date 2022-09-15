<template>
  <div class="rk-ruler-demo">
    <rk-ruler
      @zoomChange="rulerZoomChange"
      @move="moveFun"
    >
      <div class="rk-ruler-in">
        slot 测试
      </div>
    </rk-ruler>
  </div>
</template>

<script>
import RkRuler from './rk-ruler';
export default {
  name: 'RkRulerDemo',
  components: {
    RkRuler
  },
  methods: {
    rulerZoomChange(num) {
      console.log('当前缩放' + num);
    },
    moveFun(pos) {
      let {left, top} = pos;
      console.log(`当前位置：{left: ${left}, top: ${top}`);
    }
  }
};
</script>

<style scoped lang="less">
  .rk-ruler-demo{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .rk-ruler-in{
    background: #fff;
    width:100%;
    height:100%;
  }
</style>
