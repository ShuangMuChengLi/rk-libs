<template>
  <div
    ref="slide"
    class="slide-wrapper"
  >
    <canvas
      id="canvas"
    />
  </div>
</template>

<script>
export default {
  name: 'PurdahSlide',
  props:{
    data: {
      default(){
        return [];
      },
      type: Array
    }
  },
  data(){
    return {
      loadedCount: 0,
      value: 0,
      width: null,
      height: null,
      imgList: [],
      ctx: null,
      isAdd: true,
      currentIndex: 0,
      nextIndex: 1,
    };
  },
  watch:{
    data:{
      handler(){
        this.init();
      },
      immediate: false
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    loadImg(index, src){
      return new Promise((resolve, reject) =>{
        let img = new Image();
        this.imgList.push({
          img
        });
        img.src = src;
        img.onload = ()=>{
          resolve(true);
        };
      });
    },
    async init(){
      let pList = [];
      this.imgList = [];
      for(let i = 0; i < this.data.length; i++){
        pList.push(this.loadImg(i, this.data[i]));
      }
      Promise.all(pList).then(() => {
        let canvas = document.getElementById('canvas');
        canvas.width = this.$refs.slide.offsetWidth;
        canvas.height = this.$refs.slide.offsetHeight;
        this.ctx = canvas.getContext('2d');
        this.draw();
      }).catch((error) => {
        console.log(error);
      });
    },
    draw(){
      let ctx = this.ctx;
      let width = canvas.width;
      let height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      const t = width * (this.value / 100);
      let rate = width / height;
      let currentIndex = this.currentIndex % this.imgList.length;
      let nextIndex = this.nextIndex % this.imgList.length;
      let currentImg = this.imgList[currentIndex].img;
      let nextImg = this.imgList[nextIndex].img;
      let currentImgRate = currentImg.width / currentImg.height;
      let targetImgHeight = width / currentImgRate;
      ctx.drawImage(currentImg, 0, 0, currentImg.width, currentImg.width / rate, 0, (height - targetImgHeight) / 2, width, height);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(t, 0);
      ctx.lineTo(t, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.clip();
      ctx.clearRect(0, 0, t, height);
      let nextImgImgRate = nextImg.width / nextImg.height;
      let nextImgTargetImgHeight = width / nextImgImgRate;
      ctx.drawImage(nextImg, 0, 0, nextImg.width, nextImg.width / rate, 0, (height - nextImgTargetImgHeight) / 2, width, height);
      ctx.restore();
      requestAnimationFrame(()=>{
        if(this.isAdd){
          this.value += 0.2;
          if(this.value >= 100){
            this.isAdd = false;
            this.currentIndex += 2;
          }
        }else{
          this.value -= 0.15;
          if(this.value <= 0){
            this.isAdd = true;
            this.nextIndex += 2;
          }
        }
        this.draw();
      });
    }
  }
};
</script>

<style scoped lang="less">
.slide-wrapper{
  width: 100%;
  height: 100%;
}
</style>
