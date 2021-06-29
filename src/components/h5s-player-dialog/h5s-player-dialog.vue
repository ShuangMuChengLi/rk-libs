<template>
  <common-dialog
    :visible="visible"
    :title="channelName"
    @close="close"
  >
    <div
      class="live-video-wrapper only-video"
    >
      <div
        class="show-video-bar"
      >
        <template
          v-if="!!channelCode"
        >
          <h5s-live-player
            ref="H5sLivePlayer"
            :channel-id="channelCode"
            :play-back-range="playBackRange"
            class="video-area"
            :serverInfo="serverInfo"
          />
        </template>
        <div
          v-if="!channelCode"
          class="empty-video"
        >
          <div class="no-data" />
          暂无视频连接
        </div>
        <progress-bar
          v-if="progressBarVisible"
          class="progress-bar"
          :current="progressBarDate"
          @playBack="playBack"
          @exit="progressBarExit"
        />
      </div>
      <video-console
        v-if="consoleVisible"
        class="video-console"
        :channel-id="channelCode"
        :video-title="channelName"
        :is-playback="isPlayback"
        @control="control"
        @playback="playbackBarShow"
      />
      <div class="btn-wrapper">
        <div
          class="full-screen-icon"
          title="全屏"
          @click="fullScreenVideo"
        />
        <div
          class="cut-icon"
          title="截图"
          @click="screenshot"
        />
        <div
          class="menu-btn"
          :class="{'is-showing': !consoleVisible}"
          title="云台"
          @click="showConsole"
        />
      </div>
    </div>
  </common-dialog>
</template>
<script>
import CommonDialog from './common-dialog/common-dialog';
import H5sLivePlayer from './h5s-player/h5s-live-player';
import VideoConsole from './video-console/video-console';
import ProgressBar from './progress-bar/progress-bar';
import moment from 'moment';
export default {
  name: 'H5sPlayerDialog',
  components: {ProgressBar, VideoConsole, H5sLivePlayer, CommonDialog},
  props:{
    visible:{
      type: Boolean,
      default: false
    },
    channelName: {
      type: String,
      default: null
    },
    channelCode: {
      type: String,
      default: null
    },
    serverInfo:{
      default: null,
      type: Object
    }
  },
  data(){
    return{
      progressBarVisible: false,
      isPlayback: false,
      playBackRange: null,
      progressBarDate: null,
      lastCtrlType: '', //当前的控制的类别
      delay: 0, //延时
      throttleTimer: null,
      stopCtrlTimer: null,
      conditionTime: null,
      consoleVisible: true
    };
  },
  methods:{
    close(){
      this.$refs.H5sLivePlayer.stopVideo();
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    playRealTimeVideo(){
      this.playBackRange = null;
      this.$refs.H5sLivePlayer.playVideo();
    },
    /**
     * 节流0.2秒；
     * 每多点击一次，便多延时0.5秒去停止控制
     * lastCtrlType 上次控制的类型
     * */
    control(controlKey){
      if(controlKey === 'reset'){
        this.$refs.H5sLivePlayer.resetDeviceViewer();
        return;
      }

      if(controlKey === 'setPreset'){
        this.$refs.H5sLivePlayer.setPreset();
        return;
      }

      let controlDirection = controlKey;
      if(!controlDirection)return;

      clearTimeout(this.stopCtrlTimer);
      if(this.lastCtrlType !== controlDirection){
        this.lastCtrlType = controlDirection;
        this.$refs.H5sLivePlayer.setRequestPtzControl(controlDirection);
        this.delay = 0; // 快速点击一个方向，然后快速切换另外的方向
      }

      this.delay += 500;
      this.stopCtrlTimer = setTimeout(()=>{
        this.$refs.H5sLivePlayer.setRequestPtzControl('stop');
        this.delay = 0;
        this.lastCtrlType = '';
      }, this.delay);
    },
    playbackBarShow(date){
      this.progressBarDate = date;
      this.progressBarVisible = true;
    },
    fullScreenVideo(){
      this.$refs.H5sLivePlayer.videoToFullScreen();
    },
    /**
     * 实现视频截图
     */
    screenshot() {
      const id = this.$refs.H5sLivePlayer?.id || '';
      this.$nextTick(() => {
        const picName = `${this.channelCode}-${moment().format('YYYY-MM-DD HH:mm:ss')}.png`;
        let videoEl = document.getElementById(id);
        const videoHeight = videoEl.videoHeight;
        const videoWidth = videoEl.videoWidth;
        const canvasEl = document.createElement('canvas');
        canvasEl.width = videoWidth;
        canvasEl.height = videoHeight;
        canvasEl.getContext('2d').drawImage(videoEl, 0, 0, videoWidth, videoHeight);
        const picType = 'image/png';
        let oGrayImg = canvasEl.toDataURL(picType, 1);
        const picA = document.createElement('a');
        picA.download = picName;
        picA.href = oGrayImg;
        document.body.appendChild(picA);
        picA.click();
        document.body.removeChild(picA);
      });
    },
    showConsole(){
      this.consoleVisible = !this.consoleVisible;
    },
    playBack(...arg){
      this.playBackRange = {
        start: moment(arg[0]).format('YYYY-MM-DDTHHmmss+08'),
        end: moment(arg[1]).format('YYYY-MM-DDTHHmmss+08')
      };
      setTimeout(()=>{
        this.$refs.H5sLivePlayer.playBackVideo();
      });
      this.isPlayback = true;
    },
    progressBarExit(){
      this.progressBarDate = null;
      this.progressBarVisible = false;
      this.playRealTimeVideo();
      this.isPlayback = false;
    }
  }
};
</script>

<style scoped lang="less">
  @import "./h5s-player-dialog";
</style>
