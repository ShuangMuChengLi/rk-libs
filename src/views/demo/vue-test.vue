<template>
  <div>
    <video-comp :options="videoOptions" />
  </div>
</template>

<script>

import VideoComp from './video-comp';
export default {
  name: 'VideoExample',
  components: {VideoComp},
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src:
              'rtmp://127.0.0.1:1935/live/test',
            type: 'rtmp/vlc'
          }
        ]
      }
    };
  }
};
</script>
<style scoped lang="less">

</style>
