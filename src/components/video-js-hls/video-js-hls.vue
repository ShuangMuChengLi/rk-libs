<template>
  <div
    class="wrapper"
  >
    <video
      :id="id"
      class="video-js vjs-default-skin vjs-big-play-centered"
      :class="{'no-vjs-control-bar': control}"
      style="width: 100%; height: 100%; background-color: #1b2030;"
    />
  </div>
</template>

<script>
import videojs from 'video.js';
import 'videojs-contrib-hls';
export default {
  name: 'VideoJsHls',
  props: {
    id: {
      type: String,
      default() {
        return 'video-player-id';
      }
    },
    videoSrc: {
      type: String,
      default() {
        return '';
      }
    },
    muted: {
      type: Boolean,
      default() {
        return true;
      }
    },
    control: {
      type: Boolean,
      default() {
        return false;
      }
    },
    startTime: String
  },
  data() {
    return {
      player: null,
      showControl: false,
      duration: 0,
      currentTime: '',
      isPause: true,
    };
  },
  computed: {
    timeline() {
      return {
        startTime: this.startTime,
        length: this.duration,
        currentTime: this.currentTime
      };
    },
  },
  watch: {
    videoSrc: {
      handler(val) {
        if (!val) return;
        if (this.player) {
          this.changeSrc(val);
        } else {
          this.initVideo(val);
        }
      },
      immediate: false
    }
  },
  mounted() {
    this.initVideo(this.videoSrc);
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    initVideo(src){
      if(!src)return;

      let that = this;
      const options = {
        controls: true,
        autoplay: true,
        muted: this.muted
      };
      this.player = videojs(this.id, options, function onPlayerReady() {
        videojs.log('Your player is ready!');
        this.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
          enableVolumeScroll: false, //禁用鼠标滚轮调节问音量大小
          enableModifiersForNumbers: false
        });
        that.duration = that.player.duration();
        // How about an event listener?
        this.on('ended', function() {
          videojs.log('Awww...over so soon?!');
        });
        this.on('pause', function() {
          that.isPause = true;
        });
        this.on('play', function() {
          that.isPause = false;
        });
        this.on('timeupdate', function(e) {
          that.duration = that.player.duration();
          that.currentTime = that.player.currentTime();
        });
      });

      this.player.ready(function() {
        if (/\.m3u8/.test(src)) {
          this.src({
            src,
            type: 'application/x-mpegURL',
          });
        } else {
          this.src(src);
        };
      });
    },
    changeSrc(src) {
      if (/\.m3u8/.test(src)) {
        this.player.src({
          src,
          type: 'application/x-mpegURL',
        });
      } else {
        this.player.src(src);
      };
    },
    handFullScreen() {
      if(this.player.supportsFullScreen()) {
        this.player.enterFullScreen();
      } else {
        this.player.requestFullscreen();
      }
    },
    // 拖动时间轴
    handCurrentTimeChange(sec) {
      this.player.currentTime(sec);
    },
    // 快退
    handPrev() {
      this.player.currentTime(this.currentTime - 10);
    },
    // 快进
    handNext() {
      this.player.currentTime(this.currentTime + 10);
    },
    // 播放
    handPlay() {
      this.player.play();
    },
    // 暂停
    handPause() {
      this.player.pause();
    },
    // 显示控制按钮
    enterVideo() {
      this.showControl = true;
    },
    // 隐藏控制按钮
    leaveVideo() {
      this.showControl = false;
    },
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /deep/.no-vjs-control-bar .vjs-control-bar {
    display: none;
  }
  .control-bar {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 10px;
    text-align: right;
    background: rgba(0, 0, 0, .2);
    img {
      vertical-align: middle;
      cursor: pointer;
      & + img {
        margin-left: 10px;
      }
    }
  }
}
</style>
