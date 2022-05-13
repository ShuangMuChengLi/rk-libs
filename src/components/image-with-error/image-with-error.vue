<template>
  <div
    class="image-width-error"
  >
    <el-image
      v-if="imgSrc"
      class="img"
      :src="imgSrc"
      fit="contain"
      @error="onError"
    >
      <div
        slot="error"
        class="empty"
      >
        <img :src="emptyImg">
      </div>
    </el-image>
    <div
      v-if="!imgSrc && !timer"
      class="empty"
    >
      <img :src="emptyImg">
    </div>
  </div>
</template>

<script>
import emptyImg from './empty.png';
import emptyBlackImg from './empty-black.png';
export default {
  name: 'ImageWithError',
  props:{
    src:{
      type: String,
      default: null
    },
    emptyImgType: {
      type: [String, Number],
      default: 1
    },
    enableReload: {
      type: Boolean,
      default: false
    },
    reloadSeconds: {
      type: Number,
      default: 10
    },
    errorSrc: {
      type: String,
      default: null
    },
  },
  data(){
    return{
      timer: null,
      imgSrc: null,
      loadedTimes: 0
    };
  },
  computed:{
    emptyImg(){
      if(this.errorSrc)return this.errorSrc;

      let typeToImg = {
        '1': emptyBlackImg,
        '2': emptyImg,
      };
      return typeToImg[this.emptyImgType + ''];
    }
  },
  watch:{
    src:{
      immediate: true,
      handler(src){
        this.imgSrc = src;
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  mounted() {
  },
  methods:{
    onError(){
      if(this.enableReload){
        this.imgSrc = null;
        this.timer = null;
        this.loadedTimes++;
        if(this.loadedTimes > this.reloadSeconds){
          return;
        }

        this.timer = setTimeout(()=>{
          this.imgSrc = this.src;
        }, 1000);
      }
    }
  }
};
</script>

<style scoped lang="less">
.image-width-error{
  width: 100%;
  height: 100%;
  .img{
    width: 100%;
    height: 100%;
  }
  /deep/.empty{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/.el-image__error{
    display: none;
  }
  /deep/.el-image__placeholder{
    display: none;
  }

}
</style>
