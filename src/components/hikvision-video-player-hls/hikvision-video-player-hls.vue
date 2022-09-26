<!-- hls视频播放 -->
<template>
  <div
    class="video-hikvision-ws-hls"
    :style="`width: ${option.iWidth}px;`"
  >
    <div
      v-for="item in videoEleList"
      :key="item"
      :style="`width: ${option.iWidth / splitScreen}px;`"
      class="video-hikvision-ws-hls-inner"
    >
      <video
        :ref="item"
        class="video-js vjs-big-play-centered vjs-fluid"
        @dblclick="fullScreen(item)"
      />
    </div>
  </div>
</template>
<script>
import video_zhCN from 'video.js/dist/lang/zh-CN.json';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import axios from 'rk-axios';
import {api, JsonHeader} from '../../../config/api-config';
videojs.addLanguage('zh-CN', video_zhCN);
export default {
  props: {
    // 播放器配置
    option: {
      type: Object,
      default: () => ({})
    },
    channelCode: {
      // 通道id
      type: [String, Array],
      default: '',
      required: true,
      validator: function(item) {
        if (Array.isArray(item)) {
          return item.every(code => {
            return typeof code === 'string';
          });
        }
        return typeof item === 'string';
      }
    }
  },
  data() {
    return {
      myPlayer: null,
      urlList: [], // 播放链接
      videoEleList: []
    };
  },
  computed: {
    splitScreen() {
      let vList = this.videoEleList;
      let urlNum = Math.sqrt(vList.length);
      let splitNum = Math.ceil(urlNum);
      if (splitNum > 4) {
        splitNum = 4;
      }
      return splitNum;
    }
  },
  watch: {
    channelCode: {
      handler(val) {
        this.initPlayer(val);
      },
      immediate :true
    }
  },
  beforeDestroy() {
    if (this.videoEleList && this.videoEleList.length > 0) {
      this.videoEleList.forEach(item => {
        this.$refs[item].dispose();
      });
    }
  },
  methods: {
    //  初始化视频
    async initPlayer(channelCode) {
      if (Array.isArray(channelCode)) {
        this.videoEleList = channelCode;
        let promiseList = channelCode.reduce((pre, cur) => {
          pre.push(this.getPlayUrl(cur));
          return pre;
        }, []);
        let urls = await Promise.all(promiseList);
        this.urlList = urls;
        this.createPlayer(urls);
        return;
      }
      this.videoEleList = [channelCode];
      let url = await this.getPlayUrl(channelCode);
      this.urlList = [url];
      this.createPlayer([url]);
      return;
    },
    // 创建视频播放
    createPlayer(urls) {
      this.$nextTick(() => {
        urls.forEach(item => {
          this.initElement(item.channelCode, item.src);
        });
      });
    },
    // 获取当前设备的播放链接
    async getPlayUrl(channelCode) {
      if (!channelCode) {
        this.$message.error('没有获取到通道ID');
        return;
      }
      const params = {
        cameraIndexCode: channelCode, // 通道号
        streamType: '0', // 码流类型(0-主码流,1-子码流),未填默认为主码流
        protocol: 'hls', // 协议类型（rtsp-rtsp协议,rtmp-rtmp协议,hls-hLS协议,ws-ws协议），未填写为rtsp协议
        transmode: '1', // 协议类型( 0-udp，1-tcp),默认为tcp，在protocol设置为rtsp或者rtmp时有效
        expand: '' // 拓展字段（标准协议取流不需要扩展字段信息
      };
      try {
        const res = await axios.get(api.hikDeviceInfo.getPreviewUrl, params, JsonHeader);
        if (res.data.code === 200) {
          return {
            src: res.data.result,
            channelCode
          };
        }
        this.$message.error(res.data.message || '获取播放链接失败！');
      } catch (error) {
        throw error;
      }
      return {
        src: '',
        channelCode
      };
    },
    // 实例化播放器
    initElement(ref, src) {
      this.myPlayer = videojs(this.$refs[ref][0], {
        autoplay: true,
        muted: true,
        fluid: true,
        preload: 'auto',
        language: 'zh-CN',
        controls: false,
        sources: [
          {
            src,
            type: 'application/x-mpegURL'
          }
        ]
      });
    },
    // 全屏
    fullScreen(node) {
      let element = this.$refs[node][0];
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById('video');
        var cssText = 'width:100%;height:100%;overflow:hidden;';
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
        videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';
        document.IsFullScreen = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.video-hikvision-ws-hls {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: start;
  .video-hikvision-ws-hls-inner {
    object-fit: contain;
    width: 300px;
  }
}
</style>
