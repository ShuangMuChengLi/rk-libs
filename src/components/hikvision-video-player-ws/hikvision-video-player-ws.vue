<!--对接海康媒体平台 websocket-->
<template>
  <div>
    <div
      :id="videoId"
      class="video-hikvision-ws"
    />
  </div>
</template>
<script>
import axios from 'rk-axios';
import {api, JsonHeader} from '../../../config/api-config';
const MSE_IS_SUPPORT = !!window.MediaSource; // 是否支持mse
export default {
  props: {
    // 播放器配置
    option: {
      type: Object,
      default: () =>({})
    },
    channelCode: { // 通道id
      type: [String, Array],
      default: '',
      required: true,
      validator: function (item) {
        if (Array.isArray(item)) {
          return item.every((code) => {
            return typeof code === 'string';
          });
        }
        return typeof item === 'string';
      }
    }
  },
  data() {
    return {
      mseSupport: MSE_IS_SUPPORT,
      urls: '', // 播放链接
      channelCodeOld: '', // 旧的channelCode
      player: null, // 视频播放器实例
      mode: 1, // / 解码类型：0=普通模式; 1=高级模式 默认为0
      loading: false // 是否显示加载菊花
    };
  },
  computed: {
    videoId() {
      if (Array.isArray(this.channelCode)) {
        return this.channelCode[0];
      }
      return this.channelCode;
    }
  },
  watch: {
    async channelCode(val) {
      this.formatPlayUrl(val);
    } 
  },
  mounted() {
    this.$nextTick(async () => {
      this.loading = true;
      this.init();
      this.createPlayer();
      await this.formatPlayUrl(this.channelCode);
      this.loading = false;
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.playerResize);
  },
  methods: {
    // 获取urls
    async formatPlayUrl(val) {
      if (!val) {
        return;
      }
      if(Array.isArray(val)) {
        if (JSON.stringify(this.channelCodeOld) === JSON.stringify(val)) {
          return;
        }
      } else {
        if (this.channelCodeOld === val) {
          return;
        }
      }
      this.channelCodeOld = val;
      if (Array.isArray(val)) {
        let funList = val.map((item) => {
          return this.getPlayUrl(item);
        });
        let wsUrlList = await Promise.all(funList);
        console.log(123123, wsUrlList);
        this.urls = wsUrlList;
        this.realplay(wsUrlList);
      } else {
        let wsUrl = await this.getPlayUrl(val);
        this.realplay([wsUrl]);
      }
      return;
    },
    init() {
      window.addEventListener('resize', this.playerResize);
    },
    playerResize() {
      this.player.JS_Resize();
    },
    // 创建播放器实例
    createPlayer() {
      //  szId: 'play_window', //需要英文字母开头 必填
      // szBasePath: './dist', // 必填,引用H5player.min.js的js相对路径
      // 当容器div#play_window有固定宽高时，可不传iWidth和iHeight，窗口大小将自适应容器宽高
      // iWidth: 600, // 播放器宽度
      // iHeight: 400, // 播放器高度
      // 分屏播放，默认最大分屏4*4
      // iMaxSplit: 4,
      // iCurrentSplit: 1
      const params = {
        szId: this.videoId,
        szBasePath: '/h5player/'
      };
      const paramsSet = {
        iMaxSplit: 4, // 分屏播放，默认最大分屏4*4
        iCurrentSplit: 1, // 分屏 N * N
        openDebug: true,
        scale: 1,
        iWidth: 463,
        iHeight: 300,
        oStyle: {
          borderSelect: 'none'
        }
      };
      for (const key in this.option) {
        if (Object.hasOwnProperty.call(this.option, key)) {
          const element = this.option[key];
          if (element) {
            paramsSet[key] = element;
          }
        }
      }
      const opt = Object.assign(paramsSet, params);
      console.log('123123 createPlayer', opt);

      this.player = new window.JSPlugin(opt);
    },
    // 开始播放
    // urls Array 视频的websocket链接
    async realplay(urls) {
      if (!Array.isArray(urls)) {
        throw 'urls in not a Array';
      }
      try {
        let urlNum = Math.sqrt(urls.length);
        let splitNum = Math.ceil(urlNum);
        if (splitNum > 4) {
          splitNum = 4;
        }
        if (urls.length === 1) {
          this.justPlay(urls[0], 0);
          return;
        }
        await this.player.JS_ArrangeWindow(splitNum);
        for (let i = 0; i < urls.length; i++) {
          const u = urls[i];
          await this.justPlay(u, i);
        }
      } catch (error) {
        throw(new Error(error));
      }
    },
    /**
    * 按照websocket和下标播放视频
    *@param {String} playURL 播放链接 
    *@param {Number} index 当前播放的窗口标号 0 ~ N * N
    *@return {} 
    **/
    justPlay(playURL, index) {
      if (!playURL || typeof(playURL) !== 'string') {
        return new Promise((resolve, reject) => {
          if (!playURL) {
            return resolve(new Error('获取ws地址失败'));
          }
          return reject('');
        });
      }
      return this.player.JS_Play(playURL, { playURL, mode: 1 }, index);
    },
    // getPlayUrl 获取websocket播放链接
    async getPlayUrl(channelCode) {
      if (!channelCode) {
        this.$message.error('没有获取到通道ID');
        return;
      }
      const params = {
        cameraIndexCode: channelCode, // 通道号
        streamType: '0', // 码流类型(0-主码流,1-子码流),未填默认为主码流
        protocol: 'ws', // 协议类型（rtsp-rtsp协议,rtmp-rtmp协议,hls-hLS协议,ws-ws协议），未填写为rtsp协议
        transmode: '1', // 协议类型( 0-udp，1-tcp),默认为tcp，在protocol设置为rtsp或者rtmp时有效
        expand: '' // 拓展字段（标准协议取流不需要扩展字段信息
      };
      try {
        const res = await axios.get(api.hikDeviceInfo.getPreviewUrl, params, JsonHeader);
        if (res.data.code === 200) {
          return res.data.result;
        }
        this.$message.error(res.data.message || '获取播放链接失败！');
      } catch (error) {
        throw error;
      }
      return;
    }
    
  }
};
</script>
<style lang="less" scoped>
.video-hikvision-ws {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>