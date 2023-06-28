<template>
  <div
    :id="id"
    class="video-kmedia-warpper"
  />
</template>

<script>
import {axios} from '../../../../js/tools/axios';
import {systemApi} from '../../../../../config/api-config';
export default {
  name: 'VideoHaikang',
  props:{
    isFullScreen:{
      type: Boolean,
      default: false
    },
    gbId:{
      type: String,
      default: null
    },
    wsUrl:{
      type: String,
      default: null
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      id: '',
      videoObj: null
    };
  },
  watch:{
    gbId:{
      handler(val){
        this.handlerWatch(val);
      },
      immediate: false
    },
    wsUrl:{
      handler(val){
        this.handlerWatch(val);
      },
      immediate: false
    },
    isFullScreen:{
      handler(val){
        if(val){
          this.requestFullscreen();
        }else{
          this.exitFullScreen();
        }
      },
      immediate: false
    },
  },
  beforeDestroy() {
    this.closeMedia();
  },
  created(){
    this.id = `video-kmedia${Math.ceil(Math.random() * 1000)}`;
  },
  mounted() {
    if(this.autoPlay){
      this.startOpenVideo();
    }
  },
  methods:{
    handlerWatch: _.debounce(function (val) {
      if(this.videoObj){
        this.closeMedia();
        if(!val)return;

        this.$nextTick(()=>{
          this.startOpenVideo();
        });
      }else{
        if(!val)return;

        if(this.autoPlay){
          this.startOpenVideo();
        }
      }
    }, 3000, {leading: true, trailing:true, maxWait: 3000})
    ,
    /**
       * 打开视频
       *
       * */
    async startOpenVideo(){
      if(!this.gbId && !this.wsUrl) return;

      if(this.videoObj){
          this.videoObj?.closeMedia();
          this.videoObj = null;
      }

      this.bus.$emit('video-console-haikang:setData', {gbId: this.gbId});
      let mediaUrl;
      if(!this.wsUrl){
        mediaUrl = await this.getQueryVideoWebsoketInfo();

        if(!mediaUrl){
          this.$message.error('获取播放地址失败');
          return;
        }
      }else{
        mediaUrl = this.wsUrl;
      }


      console.log('视频初始化');
      this.videoObj = new JSPlugin({
        szId: this.id, //需要英文字母开头 必填
        szBasePath: './h5player', // 必填,引用H5player.min.js的js相对路径

        // 当容器div#play_window有固定宽高时，可不传iWidth和iHeight，窗口大小将自适应容器宽高
        // iWidth: 600,
        // iHeight: 400,

        // 分屏播放，默认最大分屏4*4
        iMaxSplit: 1,
        iCurrentSplit: 1,

        // 样式
        // oStyle: {
        //   border: "#343434",
        //   borderSelect: "#FFCC00",
        //   background: "#000"
        // }
      });

      console.log('设置超时', 0, 3);
      this.videoObj.JS_SetConnectTimeOut(0, 3);
      console.log('尝试播放', mediaUrl);
      this.videoObj.JS_Play(
        mediaUrl,
        {
          playURL: mediaUrl, // 流媒体播放时必传
          mode: 0, // 解码类型：0=普通模式; 1=高级模式 默认为0
          // 设置直连时的认证参数等
          // ...
        },
        0, //当前窗口下标

      ).then(
        () => {
          console.info('JS_Play success');
          // this.videoObj.JS_OpenSound().then(
          //   () => {
          //     console.log('openSound success');
          //   },
          //   e => {
          //     console.error(e);
          //     this.handlerWatch(this.gbId);
          //   }
          // );
          // do you want...
        },
        (err) => {
          console.info('JS_Play failed:', err);
          this.handlerWatch(this.gbId);
          // do you want...
        }
      );

    },
    requestFullscreen(){
      this.videoObj.JS_FullScreenDisplay(true).then(
        () => {
          console.info('JS_FullScreenDisplay success');
          // do you want...
        },
        (err) => {
          console.info('JS_FullScreenDisplay failed');
          // do you want...
        }
      );
    },
    exitFullScreen(){
      this.videoObj.JS_FullScreenDisplay(false).then(
        () => {
          console.info('JS_FullScreenDisplay success');
          // do you want...
        },
        (err) => {
          console.info('JS_FullScreenDisplay failed');
          // do you want...
        }
      );
    },
    play(){
      this.startOpenVideo();
    },
    pause(){
      this.videoObj.JS_StopRealPlayAll().then(
        () => {
          console.info('JS_StopRealPlayAll success');
          // do you want...
        },
        (err) => {
          console.info('JS_StopRealPlayAll failed');
          // do you want...
        }
      );
    },
    stop(){
      this.videoObj.JS_StopRealPlayAll().then(
        () => {
          console.info('JS_StopRealPlayAll success');
          this.videoObj = null;
          // do you want...
        },
        (err) => {
          console.info('JS_StopRealPlayAll failed');
          this.videoObj = null;
          // do you want...
        }
      );
    },
    closeMedia(){
      if(!this.videoObj) return;

      this.stop();
    },
    async getQueryVideoWebsoketInfo(){
      // return 'ws://44.64.129.167/kiop-gateway-core/media/**?apikey=04522623-b4e2-49cf-94fb-8a325a7408b2&gbId=35020100031321000411';
      return await axios.get(systemApi.api + '/api-dsp/hikvisionApiCall/getPreviewUrl', {
        cameraIndexCode: this.gbId,
        protocol: 'ws',
      }).then((res)=>{
        if(res.data.code === 200){
          return res.data.message;
        }else{
          return false;
        }
      }).catch((err)=>{
        console.error(err);
        return false;
      });

    },
    videoLoad(){
      console.log('videoLoad');
      this.play();
    }
  }
};
</script>

<style scoped lang="less">
  .video-kmedia-warpper{
    width: 100%;
    height: 100%;
  }
  /deep/.sub-wnd{
    left: 0;
    top: 0;
    z-index: 99999!important;
  }
</style>
