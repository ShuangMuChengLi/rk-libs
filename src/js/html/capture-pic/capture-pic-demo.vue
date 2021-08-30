<template>
  <div>
    <div>
      <h2>直接抓拍</h2>
      <button
        @click="capture"
      >
        抓拍
      </button>
    </div>
    <div>
      <h2>video预览</h2>
      <button @click="preView">
        预览
      </button>
      <button
        @click="getBase64"
      >
        抓拍
      </button>
      <button @click="stop">
        停止
      </button>
    </div>
    <div>
      <video id="video" />
    </div>
    <div>
      <img
        id="img"
        :src="src"
      >
    </div>
  </div>
</template>

<script>
import { CapturePic } from 'capture-pic';
export default {
  name: 'CapturePicDemo',
  data(){
    return {
      capUtil: null,
      src: null
    };
  },
  methods:{
    async capture(){
      this.capUtil = await new CapturePic().init();
      this.getBase64();
      this.stop();
    },
    async preView(){
      this.capUtil = await new CapturePic({
        videoId:'video'
      }).init();
    },
    getBase64(){
      this.src = this.capUtil.capture().getBase64();
    },
    stop(){
      this.capUtil.stop();
      this.capUtil = null;
    }
  }
};
</script>
