<template>
  <div class="video-first-frame-demo">
    <video
      width="200"
      height="200"
      :src="videoUrl"
      controls
    />
    <img
      :src="videoImg"
    >
  </div>
</template>

<script>
import videoUrl from './movie.ogg';
import { getVideoFirstFrame } from './video-first-frame';
export default {
  name: 'VideoFirstFrameDemo',
  data() {
    return {
      videoUrl,
      videoImg: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.videoImg = await getVideoFirstFrame(this.videoUrl, 200, 200);
    }
  }
};
</script>

<style scoped lang="less">
  .video-first-frame-demo {
    & > img{
      width: 200px;
      height: 200px;
      margin-left: 10px;
    }
  }
</style>
