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
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
      @mouseout="mouseup"
    />
  </div>
</template>

<script>
import demoImg from './demo.jpg';
export default {
  name: 'CanvasTest',
  data(){
    return {
      isDrawing: false,
      path: [],
      img: null,
      ctx: null
    };
  },
  mounted(){
    let canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.img = document.createElement('img');
    this.img.addEventListener('load', ()=>{
      this.ctx.drawImage(this.img, 0, 0, 960, 540);
    });
    this.img.src = demoImg;
  },
  methods:{
    drawImage(){
      this.ctx.drawImage(this.img, 0, 0, 960, 540);
    },
    mousedown(){
      this.ctx.save();
      this.path = [];
      this.isDrawing = true;
    },
    mousemove(e){
      if(this.isDrawing){
        this.path.push([e.offsetX, e.offsetY]);
        this.drawImage();
        this.ctx.beginPath();
        for(let i = 0; i < this.path.length; i ++){
          let item = this.path[i];
          if(i === 0){
            this.ctx.moveTo(...item);
          }else{
            this.ctx.lineTo(...item);
          }
        }

        this.ctx.stroke();
      }
    },
    mouseup(){
      this.drawImage();
      this.ctx.clearRect(0, 0, 960, 540);
      this.ctx.closePath();
      this.ctx.clip();
      // this.ctx.clip('evenodd');
      this.drawImage();
      this.isDrawing = false;
      this.ctx.restore();
    },
  }
};
</script>

<style scoped lang="less">
.canvas{
  margin: 20px;
}
</style>
