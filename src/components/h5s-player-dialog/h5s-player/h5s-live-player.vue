<template>
  <div class="h5s-lice-player-box">
    <div
      v-if="propsShowFullScreenIcon"
      v-show="isShowFullScreenIcon"
      class="player-layer"
      :style="setLayerHeight"
    />
    <video
      :id="id"
      class="h5video"
      autoplay
      playsinline
      muted
    />
  </div>
</template>

<script>
import { H5sPlayerWS } from './h5splayer-es6';
import axios from 'axios';
import { setCookie, getCookie } from '../../../js/html/cookie-util/cookie-util';
import rkEncrypt from './rk-encrypt';
import _ from 'lodash';
const serverUrl = 'http://50.72.110.37:8080';
const webLivePlayerApi = {
  'userLogin': serverUrl + '/api/v1/Login', // 视频登录接口
  'manualRecordStart': serverUrl + '/api/v1/ManualRecordStart', //开始回放
  'manualRecordStop': serverUrl + '/api/v1/ManualRecordStop', //结束回放
  'search': serverUrl + '/api/v1/Search', //获取录像列表
  'SearchDeviceRecordByTime': serverUrl + '/api/v1/SearchDeviceRecordByTime', //获取录像列表
  'ptz': serverUrl + '/api/v1/Ptz', // 云台控制接口
  'PtzPreset':  serverUrl + '/api/v1/PtzPreset', // 云台还原
  'SetPreset':  serverUrl + '/api/v1/SetPreset', // 云台设置默认还原点
};
let userInfo = {
  'serverUrl': 'http://50.72.110.37:8080',
  'serverHost': '50.72.110.37:8080',
  'account': 'admin',
  'password': '12345'
};
export default {
  name: 'H5sLivePlayer',
  props:{
    propsShowFullScreenIcon:{
      default: true,
      type: Boolean
    },
    id:{
      default:'h5sVideo1',
      type: String
    },
    channelId:{
      default:'',
      type: String
    },
    // selectStreamType: 1, //码流类型（0:主码流 1:辅码流 默认主码流）
    selectStreamType:{
      default: 0,
      type: Number
    },
    playBackRange:{
      default: null,
      type: Object
    }
  },
  data(){
    return {
      token: '',
      H5sPlayerObj: null,
      h5sVideoEle: null,
      playbackInfo: null,
      videoInfo: null,
      turnSpeed: 0.3, // 设置速度
      fullScreenStyleTop: 0,
      isShowFullScreenIcon: false,
      resizeTimer: null,
      isInitPlayerVideos: false //是否是初始化播放视频
    };
  },
  computed:{
    setLayerHeight(){
      return `top:${this.fullScreenStyleTop - 1}px`;
    },
  },
  watch:{
    channelId:{
      handler(newValue){
        this.stopVideo();
        if(newValue){
          this.init();
        }
      },
      immediate: true
    }
  },
  mounted(){
  },
  beforeDestroy(){
    this.stopVideo();
  },
  methods: {
    /**
     * 往url中添加query参数
     * @param url
     * @param query
     * @returns {*}
     */
    addQueryToUrl(url, query){
      const urlObj = new URL(url);
      for(let key in query){
        urlObj.searchParams.set(key, query[key]);
      }
      return urlObj.href;
    },
    async init() {
      if (!this.channelId) {
        return;
      }

      let strSession = await this.login();
      if (!strSession) {
        this.token = null;
        return;
      }

      this.token = strSession;
      if(this.playBackRange){
        this.startPlayback();
        return;
      }

      this.initVideo();
    },
    playVideo(){
      this.stopVideo();
      this.initVideo();
    },
    playBackVideo(){
      this.stopVideo();
      setTimeout(async ()=>{
        let result = await this.SearchDeviceRecordByTime();
        if(!result) return this.$message.error('获取回放视频失败');

        this.startPlayback();
      }, 1000);
    },
    async login() {
      if(getCookie('videoPlayerToken')) return getCookie('videoPlayerToken');

      let result = await axios.get(this.addQueryToUrl(this.addQueryToUrl(webLivePlayerApi.userLogin, {
        user: encodeURIComponent(userInfo.account),
        password: rkEncrypt(userInfo.password)
      }))).then((data) => {
        if (_.get(data, 'data.bStatus')) {
          return _.get(data, 'data.strSession', false);
        } else {
          return false;
        }
      }).catch((e) => {
        console.error(e);
        return false;
      });
      if (result) {
        setCookie('videoPlayerToken', result);
        return result;
      } else {
        return false;
      }
    },
    /**
     * 初始化播放实时视频
     *
     *
     * */
    initVideo() {
      let conf1 = {
        videoid: this.id,
        protocol: window.location.protocol, //'http:' or 'https:'
        host: userInfo.serverHost, //'localhost:8080'
        rootpath: '/', // '/' or window.location.pathname
        // token: 'cluster||gb||node86||' + this.channelId,
        token: this.channelId,
        hlsver: 'v1', //v1 is for ts, v2 is for fmp4
        session: this.token //session got from login
      };
      this.H5sPlayerObj = new H5sPlayerWS(conf1);
      this.H5sPlayerObj.connect();
      this.H5sPlayerObj.start();
      this.h5sVideoEle = document.getElementById(this.id);
      this.h5sVideoEle.play();
    },
    /**
     * 获取回放列表
     * @return {boolean}
     */
    async SearchDeviceRecordByTime(){
      return await axios.get(this.addQueryToUrl(webLivePlayerApi.SearchDeviceRecordByTime, {
        token: this.channelId,
        start: this.playBackRange?.start,
        end: this.playBackRange?.end,
        session: this.token
      })).then((res)=>{
        return !!(res?.data?.record && !_.isEmpty(res?.data?.record));
      }).catch((err)=>{
        console.error(err);
        return false;
      });
    },
    startPlayback(){
      console.log('startPlayback');
      const pbconf1 = {
        begintime: this.playBackRange?.start,
        endtime: this.playBackRange?.end,
        autoplay: 'true', // 'true' or 'false' for playback autoplay
        showposter: 'true', //'true' or 'false' show poster
        callback: ()=>{},
        serverpb: false,
        // userdata:  this
      };
      const conf1 = {
        videoid: this.id,
        protocol: window.location.protocol, //'http:' or 'https:'
        host: userInfo.serverHost, //'localhost:8080'
        rootpath: '/', // '/' or window.location.pathname
        token: this.channelId,
        pbconf: pbconf1,
        hlsver: 'v1', //v1 is for ts, v2 is for fmp4
        session: this.token, //session got from login
      };
      this.H5sPlayerObj = new H5sPlayerWS(conf1);
      this.H5sPlayerObj.connect();
      this.H5sPlayerObj.start();
      this.h5sVideoEle = document.getElementById(this.id);
      this.h5sVideoEle.play();
    },
    async stopVideo() {
      if (!this.H5sPlayerObj) {
        return;
      }

      this.H5sPlayerObj.disconnect();
      this.H5sPlayerObj = null;
      this.h5sVideoEle.pause();
    },
    /**
     *  云台控制指令
     *  @param controlDirection 控制移动方向（0-开始 1-停止）
     *
     * */
    async setRequestPtzControl(controlDirection){
      let result = await axios.get(this.addQueryToUrl(webLivePlayerApi.ptz, {
        token: this.channelId,
        action: controlDirection,
        speed: this.turnSpeed,
        session: this.token
      })).then((data)=>{
        if(_.get(data, 'data.bStatus')){
          return _.get(data, 'data.strCode', false);
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result) return true;

      this.$message.error('云台控制失败');
      return false;
    },
    /**
     * 开始录像
     *
     *
     * */
    async manualRecordStart(){
      let result = await axios.get(this.addQueryToUrl(webLivePlayerApi.manualRecordStart, {
        token: this.channelId,
        duration: 300,
        session: this.token
      })).then((res)=>{
        return res;
      }).catch((error)=>{
        console.error(error);
        return false;
      });

      console.log(result);
    },
    /**
     *  结束录像
     *
     * */
    async manualRecordStop(){
      let result = await axios.get(this.addQueryToUrl(webLivePlayerApi.manualRecordStop, {
        token: this.channelId,
        duration: 300,
        session: this.token
      })).then((res)=>{
        return res;
      }).catch((error)=>{
        console.error(error);
        return false;
      });

      console.log(result);
    },
    /**
     * 设置还原点
     *
     * */
    async setPreset(){
      let result = await axios.get(this.addQueryToUrl(webLivePlayerApi.SetPreset, {
        token: this.channelId,
        presetname: '1',
        presettoken: '1',
        session: this.token
      })).then((res)=>{
        console.log(res);
        this.$message.success('设置成功');
      }).catch((error)=>{
        console.error(error);
        this.$message.error('设置失败');
      });
    },
    async resetDeviceViewer(){
      let result = await axios.get(this.addQueryToUrl(webLivePlayerApi.ptz, {
        token: this.channelId,
        action: 'preset',
        preset: '1',
        speed: this.turnSpeed,
        session: this.token
      })).then((data)=>{
        if(_.get(data, 'data.bStatus')){
          return _.get(data, 'data.strCode', false);
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result) return true;

      this.$message.error('云台控制失败');
      return false;
    },
    /**
     * 全屏
     *
     * */
    videoToFullScreen(){
      const elem = document.getElementById(this.id);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    },
    /**
     *  计算宽高比例， 设置视频宽高的缩放比
     *  @param defaultVideoSizeWidth 原视频的真实宽度
     *  @param defaultVideoSizeHeight 原视频的真实高度
     *  @param screenSizeWidth 当前展示画面的宽度
     *  @param screenSizeHeight 当前展示画面的高度
     *
     *  @return
     *  {
     *    viewWidth: 生成的画面宽度
     *    viewHeight：生成的画面高度
     *    scale：视频缩放比例
     *  }
     *
     */
    setScale(defaultVideoSizeWidth, defaultVideoSizeHeight, screenSizeWidth, screenSizeHeight){
      let videoScale = (defaultVideoSizeWidth / defaultVideoSizeHeight).toFixed(2);
      let screenScale = (screenSizeWidth / screenSizeHeight).toFixed(2);
      let viewWidth, viewHeight;
      if(screenScale > videoScale){
        // 视频宽高比 大于 屏幕宽高比  视频的实际高度为当前屏幕高度， 宽度自适应变化
        viewHeight = screenSizeHeight;
        viewWidth = screenSizeHeight * defaultVideoSizeWidth / defaultVideoSizeHeight;
      }else if(screenScale < videoScale){
        // 视频宽高比 小于 屏幕宽高比  视频的实际宽度为当前屏幕宽度， 高度自适应变化
        viewHeight = screenSizeWidth * defaultVideoSizeHeight / defaultVideoSizeWidth;
        viewWidth = screenSizeWidth;
      }else {
        // 视频宽高比 等于 屏幕宽高比
        viewHeight = screenSizeHeight;
        viewWidth = screenSizeWidth;
      }
      // 返回计算点位的宽高比 ==》屏幕点位坐标 = 实际点位坐标 * 视频缩放比
      // 存储坐标 = 点击的点位坐标 / 视频缩放比
      return {
        width: viewWidth,
        height: viewHeight,
        scale: viewWidth / defaultVideoSizeWidth
      };
    }
  }
};
</script>

<style scoped lang="less">
  @import "./h5s-player";
</style>
