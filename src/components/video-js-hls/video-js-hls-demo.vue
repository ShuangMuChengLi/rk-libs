<template>
  <video-js-hls video-src="http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8" />
</template>

<script>
import VideoJsHls from './video-js-hls';
export default {
  name: 'VideoJsHlsDemo',
  components: {VideoJsHls}
};
</script>

<style scoped>

</style>
