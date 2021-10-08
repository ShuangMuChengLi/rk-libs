<template>
  <div
    v-show="value"
    ref="zoomLayer"
    class="zoom-layer"
  >
    <div
      class="holder"
    >
      <img
        class="main-pic"
        :class="{origin: isOrigin}"
        :style="imgStyle"
        :src="targetImg"
        @click="imgClick"
        @mousedown.prevent="imgMousedown"
        @mousemove.prevent="imgMousemove"
        @mouseup.prevent="imgMouseup"
      >
    </div>
    <div
      class="resize-zoom"
      :class="{ small: isOrigin }"
    />
    <div
      class="close-zoom"
      @click="close"
    />
  </div>
</template>

<script>
export default {
  name: 'ZoomPictureViewer',
  props: {
    value:{
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: null
    }
  },
  data(){
    return {
      imgStyle: null,
      window: {
        width: null,
        height: null
      },
      visibleImg: {
        width: null,
        height: null
      },
      offset: {
        x: null,
        y: null
      },
      img: {
        width: null,
        height: null,
        rate: null,
        translate: null
      },
      isOrigin: false,
      isMove: false,
      isMoving: false,
      moveObject: {

      },
      targetImg: null
    };
  },
  watch:{
    src: {
      handler(val){
        if(val){
          this.$nextTick(()=>{
            this.init();
          });

        }
      },
      immediate: true
    }
  },
  methods: {
    init(){
      let img = new Image();
      let zoomLayer = this.$refs.zoomLayer;
      this.window.width = zoomLayer.clientWidth;
      this.window.height = zoomLayer.clientHeight;
      img.onload = ()=>{
        this.img.width = img.width;
        this.img.height = img.height;
        this.img.rate = this.img.width / this.img.height;
        this.showInit();
        this.targetImg = this.src;
      };
      img.src = this.src;
    },
    showInit(){
      let imgStyle = {

      };
      this.visibleImg.width = this.window.width - 80;
      this.visibleImg.height = this.visibleImg.width / this.img.rate;
      imgStyle.width = this.visibleImg.width + 'px';
      imgStyle.height = this.visibleImg.height + 'px';
      this.img.translate = `translate(40px, ${ (this.window.height - this.visibleImg.height) / 2}px)`;
      this.imgStyle = imgStyle;
      this.imgScale();
    },
    imgScale(){
      this.isOrigin = false;
      this.imgStyle.transform = `${this.img.translate} scale(1)`;
    },
    imgOrigin(e){
      this.isOrigin = true;
      this.offset.x = e.offsetX;
      this.offset.y = e.offsetY;
      this.imgStyle.transform = `${this.img.translate} scale(${this.img.width / this.window.width})`;
      this.imgStyle['transform-origin'] = `${this.offset.x}px ${this.offset.y}px`;
    },
    imgClick(e){
      if(this.isOrigin){
        if(this.isMoving)return;

        this.imgScale();
        return;
      }

      this.imgOrigin(e);
    },
    imgMousedown(e){
      if(!this.isOrigin)return;

      this.isMove = true;
    },
    imgMousemove(e){
      if(!this.isOrigin || !this.isMove)return;

      this.isMoving = true;
      this.offset.x -= e.movementX / (this.img.width / this.window.width);
      this.offset.y -= e.movementY / (this.img.height / this.window.height);
      let style = Object.assign({}, this.imgStyle);
      style['transform-origin'] = `${this.offset.x}px ${this.offset.y}px`;
      this.imgStyle = style;
    },
    imgMouseup(){
      this.isMove = false;
      setTimeout(()=>{
        this.isMoving = false;
      });
    },
    close(){
      console.log(false);
      this.$emit('input', false);
    }
  }
};
</script>

<style scoped lang="less">
  @import "zoom-picture-viewer";
</style>
