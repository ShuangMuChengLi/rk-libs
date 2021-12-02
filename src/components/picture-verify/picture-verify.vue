<template>
  <div
    :style="{ width: width + 'px'}"
  >
    <canvas
      id="pictureVerify"
      :width="width"
      :height="height"
    />
    <el-slider
      v-model="value"
      :show-tooltip="false"
      @input="input"
      @change="change"
    />
  </div>
</template>
<script>
export default {
  name: 'PictureVerify',
  props:{
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 280
    },
    src: {
      type: String,
      default: 'https://picsum.photos/id/1003/500/300'
    }
  },
  data(){
    return {
      path: 'M201.5 255.392h136.964v-61.256c0-58.636 47.37-106.258 106.005-106.57 56.974-0.305 103.406 45.636 103.71 102.61 0.005 0.935-0.003 1.87-0.023 2.805l-1.365 62.41h132.79c57.162 0 103.5 46.34 103.5 103.5v137.05h63.882C903.316 495.941 949 541.625 949 597.98c0 56.353-45.684 102.037-102.037 102.037H783.08V834.5c0 57.161-46.338 103.5-103.5 103.5H550.474v-64.993c0-61.203-49.615-110.818-110.819-110.818-61.203 0-110.818 49.615-110.818 110.818V938H201.5C144.339 938 98 891.661 98 834.5V703.45h71.98c60.436 0 109.428-48.993 109.428-109.428 0-60.435-48.992-109.428-109.427-109.428H98V358.892c0-57.162 46.339-103.5 103.5-103.5z',
      // path: svg
      scaleX: 1,
      scaleY: 1,
      value: 0,
      targetX : 0,
      targetXRate : 0
    };
  },
  mounted () {
    this.initCanvas();
    const img = new Image();
    img.src = this.src;
    img.addEventListener('load', ()=>{
      this.drawBg(img);
      this.drawFragment(img);
      this.drawResult();
    });
  },
  methods: {
    initCanvas(){
      this.canvas = document.getElementById('pictureVerify');
      this.ctx = this.canvas.getContext('2d');

      this.fragmentCanvas = document.createElement('canvas');
      this.fragmentCanvas.width = this.width;
      this.fragmentCanvas.height = this.height;
      this.fragmentCtx = this.fragmentCanvas.getContext('2d');

      this.bgCanvas = document.createElement('canvas');
      this.bgCanvas.width = this.width;
      this.bgCanvas.height = this.height;
      this.bgCtx = this.bgCanvas.getContext('2d');

      this.scaleX = 0.2 * this.width / 930;
      this.scaleY = 0.2 * this.height / 620;
      this.targetXRate = Math.ceil(Math.random() * 100);
      this.targetX = Math.ceil(Math.random() * 20) + 50;
    },
    drawBg(img){
      this.bgCtx.save();
      this.bgCtx.translate(this.targetX / 100 * this.width, this.height / 3);
      this.bgCtx.scale(this.scaleX, this.scaleY);
      let path = new Path2D(this.path);
      let tX = - this.targetX / 100 * this.width / this.scaleX;
      let tY = - this.height / 3 / this.scaleY;
      path.moveTo(tX, tY);
      path.lineTo(this.width / this.scaleX, tY);
      path.lineTo(this.width / this.scaleX, this.height / this.scaleY + tY);
      path.lineTo(tX, this.height / this.scaleY + tY);
      this.bgCtx.clip(path, 'evenodd');
      this.bgCtx.drawImage(img, tX, tY, this.width / this.scaleX, this.height / this.scaleY );
      this.bgCtx.restore();
    },
    drawFragment(img){
      this.fragmentCtx.save();
      this.bgCtx.translate(this.targetX / 100 * this.width, this.height / 3);
      this.fragmentCtx.scale(this.scaleX, this.scaleY);
      let tX = - this.targetX / 100 * this.width / this.scaleX;
      let tY = - this.height / 3 / this.scaleY;
      let path = new Path2D(this.path);
      this.fragmentCtx.clip(path);
      this.fragmentCtx.strokeStyle = '#fff';
      this.fragmentCtx.lineWidth = 1.5;
      this.fragmentCtx.drawImage(img, tX, tY, this.width / this.scaleX, this.height / this.scaleY );
      this.fragmentCtx.stroke(path);
      this.fragmentCtx.restore();
    },
    drawResult(){
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.bgCanvas, 0, 0);
      this.ctx.drawImage(this.fragmentCanvas, this.value / 100 * this.width, this.height / 3);
    },
    input(){
      this.drawResult();
    },
    change(){
      if(this.value === this.targetX){
        this.$emit('success');
      }else{
        this.$emit('fail');
      }
    }
  }
};
</script>
