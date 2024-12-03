<template>
  <!--Rk webRtc hls\Flv-->
  <div
    v-loading="loading"
    class="webRtc-srs"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    @click="startPlay"
  >
    <video
      ref="container"
      class="h5video"
      webkit-playsinline
      :muted="!hasAudio"
      playsinline
      :poster="poster"
    />
  </div>
</template>

<script>
import loadingImg from './loading.jpg';
import errorImg from './error.jpg';
// import mpegts from "mpegts.js";
import mpegts from './mpegts-1.7.3.min.js';
// import mpegts from "./mpegts-1.7.3.min_origin.js";
// import mpegts from "./mpegts-1.7.3.js";
import Hls from './hls-0.14.17.min';
import _ from 'lodash';
import { video } from '../../api/video';
import { VideoPool } from './videoPool';
import moment from 'moment';
export default {
  name: 'WebRtcVideoRtc',
  props: {
    channelCode: {
      default: '',
      type: String,
    },
    isReplay: {
      default: false,
      type: Boolean,
    },
    replayInfo:{
      default: null,
      type: Object
    },
    url: {
      default: null,
      type: String
    }
    // storeType: {
    //   default: null,
    //   type: [String, Number],
    // },
    // startTime: {
    //   default: null,
    //   type: [String, Number],
    // },
    // endTime: {
    //   default: null,
    //   type: [String, Number],
    // },
  },
  data() {
    return {
      // channelCode: '200020241106145340000217327V00000000',
      loading: false,
      poster: loadingImg,
      player: null,
      playbackTimer: null,
      lanServerUrl: null,
      replayTimer: null,
      keepaliveTimer: null,
      sessionId: null,
      hasAudio: false,
      isPlaying: false
    };
  },
  watch:{
    replayInfo:{
      immediate: false,
      deep: true,
      handler(val){
        if(this.url)return;

        if(!this.isReplay)return;

        if(this.channelCode){
          if(val){
            this.init();
          }else{
            this.closeVideo();
          }
        }
        
      }
    },
    channelCode:{
      immediate: true,
      deep: true,
      handler(val){
        if(this.url)return;

        if(this.channelCode){
          this.init();
        }else{
          this.closeVideo();
        }
      }
    },
    url:{
      immediate: true,
      deep: true,
      handler(val){
        if(val){
          this.play(val);
        }else{
          this.closeVideo();
        }
      }
    },
  },
  beforeDestroy() {
    this.closeVideo();
  },
  async mounted() {
  },
  beforeDestroy(){
    clearImmediate(this.keepaliveTimer);
    this.closeVideo();
  },
  methods: {
    requestFullScreen() {
      this.$refs.container.requestFullscreen();
    },
    async init(){
      if(this.isReplay){
        await this.getReplayInfo(this.channelCode);
      }else{
        await this.getPlayInfo(this.channelCode);
      }
      
      this.initVideo();
    },
    initVideo() {
      this.poster = loadingImg;
      this.play(this.lanServerUrl);
      
    },
    async getPlayInfo(channelCode) {
      this.loading = true;
      let result = await video.startPreview({
        channelCode,
        liveType: 4,
        streamType: '0',
        httpType: 0,
      });
      this.loading = false;
      console.log(result);
      if (!result) {
        this.poster = errorImg;
        return;
      }

      let netType = 'lanServerUrl';
      // TRACE flv是这里
      // 非http因证书问题走代理
      // const tempNetType = location.protocol !== 'http:' ? 'lanVideoUri' :netType;
      let serverList = result.serverList || [];
      // 仅取出对应协议的直播地址
      serverList = serverList.filter((item) => {
        return item.startsWith(location.protocol);
      });
      const lanServerUrl = VideoPool.addOrigin(result[netType], serverList) || result[netType];
      // if (!lanServerUrl) {
      //   this.$message.error("暂无可用的代理域名");
      //   return;
      // }
      this.lanServerUrl = lanServerUrl;
      clearInterval(this.keepaliveTimer);
      this.keeyAlive(result.sessionId);
    },
    keeyAlive(sessionId){
      this.keepaliveTimer = setInterval(() => {
        video.keepAlive({
          channelCode: this.channelCode,
          sessionId: sessionId,
          liveType: 4
        });
      }, 20000);
    },
    async getReplayInfo(channelCode) {
      this.loading = true;
      let result = await video.startPlayback({
        channelCode,
        startTime: moment(this.replayInfo.startTime).unix(),
        endTime: moment(this.replayInfo.endTime).unix(),
        liveType: 4,
        streamType: '0',
        recordType: 0,
        storeType: this.replayInfo.storeType,
      });
      this.loading = false;
      if (!result) {
        this.poster = errorImg;
        return;
      }

      let netType = 'lanServerUrl';
      // TRACE flv是这里
      // 非http因证书问题走代理
      // const tempNetType = location.protocol !== 'http:' ? 'lanVideoUri' :netType;
      let serverList = result.serverList || [];
      // 仅取出对应协议的直播地址
      serverList = serverList.filter((item) => {
        return item.startsWith(location.protocol);
      });
      const lanServerUrl = VideoPool.addOrigin(result[netType], serverList);
      if (!lanServerUrl) {
        this.$message.error('暂无可用的代理域名');
        return;
      }
      this.lanServerUrl = lanServerUrl;
      clearInterval(this.keepaliveTimer);
      this.sessionId = result.sessionId;
      this.keeyAlive(result.sessionId);
    },
    /**
     *
     * @param lanServerUrl 'http://172.26.3.60:1985/live/1017307727487504_MDS0001.sdp.flv'
     */
    play(lanServerUrl) {
      // lanServerUrl = 'http://172.26.3.60:1985/live/1017307755698441_MDS0001.sdp.flv'
      // lanServerUrl = 'http://172.26.3.60:1985/live/3217307912834363_MDS0001.sdp.flv'
      // lanServerUrl = 'http://172.26.3.60:1985/live/3217307914094415_MDS0001.sdp.flv'
      this.closeVideo();
      if (!lanServerUrl) return;

      // Start play HTTP-FLV.
      if (lanServerUrl.indexOf('.flv') > 0) {
        if (!mpegts.getFeatureList().mseLivePlayback) {
          this.$message.warning('无法播放该流');
          return;
        }
        let url = lanServerUrl;
        const options = {
          type: 'flv',
          url,
          isLive: !this.isReplay,
          hasAudio: this.hasAudio,
        };
        const realtimeOptions = {
          // enableWorker:true,
          // enableWorkerForMSE:true,
          stashInitialSize: 3000,
          timeout: 15000,
          liveBufferLatencyChasing: true,
          liveBufferLatencyChasingOnPaused: true,
          // 以下两个值要根据网络情况作适当配置, 在流畅与卡顿、实时与稳定之间做平衡
          liveBufferLatencyMaxLatency: 1.5, // 最多延迟多少秒, 值越小, 网络不好时越容易跳帧
          liveBufferLatencyMinRemain: 0.5, // 至少缓存多少秒, 值越小, 网络不好时越容易卡顿
          lazyLoad: false,
          accurateSeek: true,
          enableStashBuffer: false,
          liveSync: true,
          liveSyncMaxLatency: 15,
          liveSyncTargetLatency: 15,
          autoCleanupSourceBuffer: true,
          autoCleanupMaxBackwardDuration: 30,
          autoCleanupMinBackwardDuration: 5,
        };
        const replayOptions = {
          // enableWorker:true,
          // enableWorkerForMSE:true,
          stashInitialSize: 3000,
          timeout: 15000,
          liveBufferLatencyChasing: false,
          liveBufferLatencyChasingOnPaused: false,
          // 以下两个值要根据网络情况作适当配置, 在流畅与卡顿、实时与稳定之间做平衡
          liveBufferLatencyMaxLatency: 5.5, // 最多延迟多少秒, 值越小, 网络不好时越容易跳帧
          liveBufferLatencyMinRemain: 1.5, // 至少缓存多少秒, 值越小, 网络不好时越容易卡顿
          lazyLoad: false,
          accurateSeek: true,
          enableStashBuffer: false,
          liveSync: false,
          liveSyncMaxLatency: 15,
          liveSyncTargetLatency: 15,
          autoCleanupSourceBuffer: false,
          autoCleanupMaxBackwardDuration: 30,
          autoCleanupMinBackwardDuration: 5,
        };

        this.player = mpegts.createPlayer(
          options,
          this.isReplay ? realtimeOptions : replayOptions
        );

        if(!this.isReplay || !this.hasAudio){
          this.player.attachMediaElement(this.$refs.container);
          this.player.load();
          this.player.play();
        }else{
          this.isPlaying = false;
        }
       
        this.player.on(mpegts.Events.ERROR, (e) => {
          // 异常与重连, 网络error值是NetworkError
          console.error('触发ERROR, 重新连接', e);

          // 加个setTimeout, 避免重复触发Error, 或者避免url不可用导致触发太快
          this.closeVideo();
          this.replayTimer = setTimeout(()=>{
            this.init();
          }, 1500);
        });
        return;
      }

      // Start play HLS.
      if (lanServerUrl.indexOf('.m3u8') > 0) {
        if (!Hls.isSupported()) {
          this.$message.warning('无法播放该流');
          return;
        }
        if (!lanServerUrl) return;

        this.player = new Hls();
        this.player.loadSource(lanServerUrl);
        this.player.attachMedia(this.$refs.container);

        this.player.on(Hls.Events.ERROR, (event, data) => {
          switch (data.details) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            console.log('fatal network error encountered, try to recover');
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('fatal media error encountered, try to recover');
            break;
          default:
            this.poster = errorImg;
            break;
          }
        });
      }
    },
    startPlay(){
      if(!this.player || this.isPlaying || !this.isReplay)return;

      this.player.attachMediaElement(this.$refs.container);
      this.player.load();
      this.player.play();
      this.isPlaying = true;
    },
    closeVideo() {
      if (this.player) {
        clearTimeout(this.replayTimer);
        clearInterval(this.keepaliveTimer);
        VideoPool.removeOrigin(this.lanServerUrl);
        this.poster = null;
        this.player.destroy();
        this.player = null;
      }
    },
    /**
     * 
     * @param arg 
     * {
     *  controlType: arg.controlType,
        controlValue: arg.controlValue,
     * }
     */
    async replayControl(arg){
      video.controlPlayback({
        channelCode: this.channelCode,
        sessionId: this.sessionId,
        controlType: arg.controlType,
        controlValue: arg.controlValue,
        storeType: this.replayInfo.storeType
      });
      if ([2, 3].includes(arg.controlType)){
        this.controlSpeed(arg.controlValue);
      }
    },
    controlSpeed(speed) {
      this.$refs.container.playbackRate = speed;
    },
    getDuration() {
      const video = this.$refs.container;
      let totalDuration = 0;
      if (video.buffered.length > 0) {
        for (let i = 0; i < video.buffered.length; i++) {
          const range = video.buffered.start(i) + video.buffered.end(i);
          totalDuration += range;
        }
      }
      return totalDuration;
    },
    /**
     * @param {number} type 0-按帧步进 1-按秒步进
     * @param {number} val 步进的倍数或秒, 为负时回退
     */
    frameStep(type, val) {
      this.controlPlay(1);
      if (type === 0) {
        const speed = this.$refs.container.playbackRate || 1;
        this.$refs.container.currentTime += (0.04 / speed) * val;
      } else {
        const currentTime = this.$refs.container.currentTime;
        if (val > 0) {
          const duration = this.getDuration();
          this.$refs.container.currentTime =
            Math.min(duration, currentTime + val) - 0.1;
        } else {
          this.$refs.container.currentTime = Math.max(0, currentTime + val);
        }
      }
    },
    /**
     * @param {boolean} type 1-暂停 0-播放
     */
    controlPlay(type) {
      if (type === 0) {
        this.player.play();
      } else if (type === 1) {
        this.player.pause();
      }
    },
    playBack() {
      this.controlPlay(1);
      // 匀速倒放
      const INTERVAL = 100;
      let prevTime = Date.now();
      this.stopPlayback();
      this.playbackTimer = setInterval(() => {
        const now = Date.now();
        const diff = now - prevTime;
        if (diff - INTERVAL > -3) {
          prevTime = now;
          this.$refs.container.currentTime -= 0.1; // 0.1秒
        }
        const time = this.$refs.container.currentTime;
        if (time <= 0) {
          this.stopPlayback();
        }
      }, 5);
    },
    stopPlayback() {
      clearInterval(this.playbackTimer);
    },
  },
};
</script>

<style scoped lang="less">
@import './RkSrs.less';
</style>
