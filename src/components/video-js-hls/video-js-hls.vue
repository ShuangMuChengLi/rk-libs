<template>
  <video
    :id="id"
    class="video-js vjs-default-skin vjs-big-play-centered"
  />
</template>

<script>
import videojs from 'video.js';
import 'videojs-contrib-hls';
export default {
  name: 'VideoJsHls',
  props: {
    videoSrc: {
      type: String,
      default() {
        return '';
      }
    },
  },
  data() {
    return {
      id: 'video-player-id' + Math.ceil(Math.random() * 1000),
      muted: true,
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

      const options = {
        controls: true,
        autoplay: true,
        muted: this.muted
      };
      this.player = videojs(this.id, options, function onPlayerReady() {
        videojs.log('Your player is ready!');
        // How about an event listener?
        this.on('ended', function() {
          videojs.log('Awww...over so soon?!');
        });
      });

      this.player.ready(function() {
        if (/\.m3u8/.test(src)) {
          console.log(111, src);
          this.src({
            src,
            type: 'application/x-mpegURL',
          });
        } else {
          this.src(src);
        }
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
  }
};
</script>
<style lang="less" scoped>
</style>
