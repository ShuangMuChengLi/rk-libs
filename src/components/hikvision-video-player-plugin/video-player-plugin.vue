<!-- 海康视频播放插件 -->
<template>
  <div>
    <div
      ref="videoPlayerWithPlugin"
      :style="`width: ${option.iWidth}px; height: ${option.iHeight}px;`"
      class="video-player-with-plugin"
    />
  </div>
</template>
<script>
import JSEncrypt from 'jsencrypt';
import WebControl from './lib/jsWebControl-1.0.0.min.js';
export default {
  props: {
    // 播放器配置
    option: {
      type: Object,
      default: () =>({
        iWidth: 500,
        iHeight: 300
      })
    },
    // 通道id
    channelCode: {
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
      oWebControl: null, // 视频窗口
      pubKey: '', // 加密key
      boxObserver: null
    };
  },
  computed: {
    // 节点ID
    nodeId() {
      return (new Date()).valueOf() + Math.random().toFixed(4) * 10000;
    },
    // 视频播放窗口布局
    videoLayout() {
      return this.getPlayerLayout(this.channelCode);
    }
  },
  watch: {
    async channelCode(newVal, oldVal) {
      if (!this.oWebControl && newVal.length > 0) {
        this.init();
        return;
      }
      if (!this.oWebControl && (!newVal || newVal.length === 0)) {
        return;
      }
      if (newVal.length !== oldVal.length) {
        this.oWebControl.JS_RequestInterface({
          funcName: 'setLayout',
          argument: JSON.stringify({ layout: this.getPlayerLayout(newVal) })
        });
      }
      if (newVal && newVal.length > 0) {
        this.startPlay();
        this.oWebControl.JS_ShowWnd();
      } else {
        this.oWebControl.JS_HideWnd();
        this.oWebControl.JS_RequestInterface({
          funcName: 'stopAllPlayback'
        });
      }
    }
  },
  mounted() {
    // this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    /**
    * 初始化
    **/
    init() {
      this.setNodeId('videoPlayerWithPlugin', this.nodeId);
      this.initPlugin();
      this.boxObserver = this.addListenerForNodePosition('videoPlayerWithPlugin', this.resetSizeAndPosition);
      window.addEventListener('resize', this.resetSizeAndPosition);
      window.addEventListener('scroll', this.resetSizeAndPosition);
      window.addEventListener('keydown', this.keyDownListener);
    },
    /**
    * 销毁
    **/
    destroy() {
      if (!this.oWebControl) {
        return;
      }
      window.removeEventListener('keydown', this.keyDownListener);
      this.boxObserver && this.boxObserver.disconnect(); // 取消监听位置订阅
      window.removeEventListener('resize', this.resetSizeAndPosition);
      window.removeEventListener('scroll', this.resetSizeAndPosition);
      this.hidePlayer();
    },
    /**
    * 给节点设置id
    **/
    setNodeId(ref, id) {
      this.$refs[ref].setAttribute('id', id);
    },
    /**
    * 根据通道数组的长度获得视频播放的布局
    **/
    getPlayerLayout(list) {
      if (!Array.isArray(list)) {
        return '1x1';
      }
      let len = list.length;
      // 这里自定最大是16路视频
      if (len >= 16) {
        return '4x4';
      }
      if (len === 1) {
        return '1x1';
      } 
      let urlNum = Math.sqrt(len);
      let splitNum = Math.ceil(urlNum);
      return `${splitNum}x${splitNum}`;
    },
    /**
    * 创建播放实例
    **/
    initPlugin() {
      
      const option = {
        szPluginContainer: this.nodeId, // 指定容器id
        iServicePortStart: 15900, // 指定起止端口号，建议使用该值
        iServicePortEnd: 15909,
        szClassId:'23BF3B0A-2C56-4D97-9C03-0CB103AA8F11', // 用于IE10使用ActiveX的clsid
        cbConnectSuccess: this.connectSuccess,
        cbConnectError: this.connectError(),
        cbConnectClose: this.connectClose
      };
      this.oWebControl = new WebControl(option);
    },
    /**
    * 插件启动成功回调
    **/
    connectSuccess() {
      this.oWebControl && this.oWebControl.JS_StartService('window', {
        dllPath: './VideoPluginConnect.dll' 
      }).then(
        // 启动插件服务成功
        () => {
          this.oWebControl.JS_SetWindowControlCallback({ // 设置消息回调
            // cbIntegrationCallBack: this.cbIntegrationCallBack
          });
          this.oWebControl.JS_CreateWnd(this.nodeId, this.option.iWidth, this.option.iHeight).then(() => { //JS_CreateWnd创建视频播放窗口，宽高可设定
            this.initVideoPlayer(); // 创建播放实例成功后初始化
          });
        },
        // 启动插件服务失败
        () => {

        }
      );
    },
    /**
    * 插件启动失败回调
    **/
    connectError() {
      let initCount = 0;
      return () => {
        this.oWebControl = null;
        this.$message('插件未启动，正在尝试启动，请稍候...');
        WebControl.JS_WakeUp('VideoWebPlugin://'); // 程序未启动时执行error函数，采用wakeup来启动程序
        initCount += 1;
        if (initCount < 3) {
          setTimeout(function () {
            initPlugin();
          }, 3000);
        } else {
          this.$message.error('插件启动失败，请检查插件是否安装！');
        }
      };
    },
    /**
    * 插件关闭回调
    **/
    connectClose() {
      this.oWebControl = null;
    },
    /**
    * 播放窗口初始化
    **/
    initVideoPlayer() {
      this.oWebControl && this.oWebControl.JS_RequestInterface({
        funcName: 'getRSAPubKey',
        argument: JSON.stringify({
          keyLength: 1024
        })
      }).then((oData) => {
        if (oData.responseMsg.data) {
          this.pubKey = oData.responseMsg.data;
          this.setPlayerOption();
        }
      });
    },
    /**
    * 配置视频播放
    **/
    setPlayerOption() {
      const argument = {
        appkey: '12345678', //综合安防管理平台提供的appkey，必填
        secret: this.setEncrypt('hTjKabcRpqskyo7h5J'), //综合安防管理平台提供的secret，必填
        ip: '10.0.0.1:443', //综合安防管理平台IP地址，必填
        playMode: 0, //初始播放模式：0-预览，1-回放
        port: 443, //综合安防管理平台端口，若启用HTTPS协议，默认443
        snapDir: 'D:\\SnapDir', //抓图存储路径
        videoDir: 'D:\\VideoDir', //紧急录像或录像剪辑存储路径
        layout: this.videoLayout, //playMode指定模式的布局
        enableHTTPS: 1, //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
        encryptedFields: 'secret', //加密字段，默认加密领域为secret
        showToolbar: 1, //是否显示工具栏，0-不显示，非0-显示
        showSmart: 1, //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        buttonIDs: '0,16,256,257,258,259,260,512,513,514,515,516,517,768,769', //自定义工具条按钮
        toolBarButtonIDs: '2049,2050,2305,4098'
      };
      this.oWebControl && this.oWebControl.JS_RequestInterface({
        funcName: 'init',
        argument
      }).then((oData) => {
        this.oWebControl.JS_Resize(this.option.iWidth, this.option.iHeight); // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
        this.startPlay();
      }, (error) => {
        this.cbIntegrationCallBack(error);
      });
    },
    // RSA加密
    setEncrypt(value) {
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },
    /**
    * 插件推送消息
    **/
    cbIntegrationCallBack(oData) {
      this.$message(JSON.stringify(oData.responseMsg));
    },
    /**
    * 重置播放器的大写和位置
    **/
    resetSizeAndPosition() {
      if (this.oWebControl) {
        this.oWebControl.JS_Resize(this.option.iWidth, this.option.iHeight);
        this.setWndCover();
      }
    },
    /**
    * 给节点添加位置监听
    *@param {ref} ref 节点监听ref 
    *@param {Function} callBack 事件回调
    *@return {MutationObserver}  
    **/
    addListenerForNodePosition(ref, callBack) {
      let config = { attributes: true, childList: false, subtree: false };// 只监听属性发生变化
      // let el = this.$refs[ref];
      let el = document.getElementsByClassName('ol-overlay-container')[2] || this.$refs[ref];
      if (!el) {
        throw(new Error('el is undefined'));
      }
      let callbackObserver = (mutationsList) => {
        mutationsList.forEach(item =>{
          if (item.type === 'attributes') {
            callBack(item);
          }
        });
      };
      let observer = new MutationObserver(callbackObserver);
      observer.observe(el, config);
      return observer;
    },
    /*
    * 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
    **/
    setWndCover() {
      let iWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let iHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let oDivRect = this.$refs['videoPlayerWithPlugin'].getBoundingClientRect();
      let playerWidth = Number(this.option.iWidth);
      let playerHeight = Number(this.option.iHeight);
      let oWebControl = this.oWebControl;

      let iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left) : 0;
      let iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top) : 0;
      let iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
      let iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

      iCoverLeft = (iCoverLeft > playerWidth) ? playerWidth : iCoverLeft;
      iCoverTop = (iCoverTop > playerHeight) ? playerHeight : iCoverTop;
      iCoverRight = (iCoverRight > playerWidth) ? playerWidth : iCoverRight;
      iCoverBottom = (iCoverBottom > playerHeight) ? playerHeight : iCoverBottom;

      oWebControl.JS_RepairPartWindow(0, 0, playerWidth + 1, playerHeight); // 多1个像素点防止还原后边界缺失一个像素条
      if (iCoverLeft !== 0) {
        oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, playerHeight);
      }
      if (iCoverTop !== 0) {
        oWebControl.JS_CuttingPartWindow(0, 0, playerWidth + 1, iCoverTop); // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
      }
      if (iCoverRight !== 0) {
        oWebControl.JS_CuttingPartWindow(playerWidth - iCoverRight, 0, iCoverRight, playerHeight);
      }
      if (iCoverBottom !== 0) {
        oWebControl.JS_CuttingPartWindow(0, playerHeight - iCoverBottom, playerWidth, iCoverBottom);
      }
    },
    /**
    * 开始播放视频
    **/
    startPlay() {
      if (!this.channelCode) {
        return;
      }
      if (!Array.isArray(this.channelCode)) {
        const option = {
          cameraIndexCode:this.channelCode, //监控点编号
          streamMode: 0, ////主子码流标识：0-主码流，1-子码流
          transMode: 1, //传输协议：0-UDP，1-TCP
          gpuMode: 0, //是否启用GPU硬解，0-不启用，1-启用
          wndId:1 //可指定播放窗口
        };
        this.oWebControl && this.oWebControl.JS_RequestInterface({
          funcName: 'startPreview',
          argument: JSON.stringify(option)
        });
        return;
      }
      this.channelCode.forEach((item, index) => {
        const option = {
          cameraIndexCode:item, //监控点编号
          streamMode: 0, ////主子码流标识：0-主码流，1-子码流
          transMode: 1, //传输协议：0-UDP，1-TCP
          gpuMode: 0, //是否启用GPU硬解，0-不启用，1-启用
          wndId:index + 1 //可指定播放窗口，从1开始
        };
        this.oWebControl && this.oWebControl.JS_RequestInterface({
          funcName: 'startPreview',
          argument: JSON.stringify(option)
        });
      });
    },
    /**
    * 全屏
    **/
    fullscreen() {
      this.oWebControl && this.oWebControl.JS_RequestInterface({
        funcName: 'setFullScreen'
      });
    },
    /**
    * 推出全屏 
    **/
    exitFullScreen() {
      this.oWebControl && this.oWebControl.JS_RequestInterface({
        funcName: 'exitFullScreen'
      });
    },
    /**
    * 按钮按下事件监听
    **/
    keyDownListener(event) {
      if (event.key === 'Escape') {
        this.exitFullScreen();
      }
    },
    /**
    * 隐藏播放器
    **/
    hidePlayer() {
      if (this.oWebControl != null){
        this.oWebControl.JS_HideWnd(); // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
        this.oWebControl.JS_Disconnect().then(function(){ // 断开与插件服务连接成功
        },
        function() { // 断开与插件服务连接失败
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.video-player-with-plugin {
  user-select: none;
  pointer-events: none;
  z-index: -1;
  position: relative;
}
</style>