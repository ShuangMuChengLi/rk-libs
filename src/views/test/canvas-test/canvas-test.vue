<template>
  <div
    ref="slide"
    class="slide-wrapper"
  >
    <canvas
      id="canvas"
      class="canvas"
      width="960"
      height="540"
    />
  </div>
</template>

<script>
import demoImg from './demo.jpg';
import _ from 'lodash';
export default {
  name: 'CanvasTest',
  data(){
    return {
      ctx: null,
      center: [960 / 2, 540 / 2],
      r: 540 / 2 - 20
    };
  },
  mounted(){
    let r = this.r;
    let a = this.center[0];
    let b = this.center[1];
    let canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.ctx.beginPath();
    this.ctx.moveTo(a - r, b);
    for(let i = a - r; i <= a + r; i += 5){
      let y = this.getY(i);
      this.ctx.lineTo(i, y);
    }
    for(let i = a + r; i >= a - r; i -= 5){
      let y = this.getY(i, -1);
      this.ctx.lineTo(i, y);
    }
    this.ctx.lineTo(a - r, b);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(a - r, b);
    this.ctx.lineTo(a + r, b);
    this.ctx.stroke();
  },
  methods:{
    getY(x, minus = 1){
      let r = this.r * _.random(0.8, 1.1);

      let a = this.center[0];
      let b = this.center[1];
      let distance = Math.sqrt(Math.pow(r, 2) - Math.pow((x - a), 2));
      return b + minus * distance;
    },
  }
};
</script>

<style scoped lang="less">
.canvas{
  margin: 20px;
}
</style>
