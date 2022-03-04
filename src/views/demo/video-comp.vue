<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js"
    />
  </div>
</template>

<script>
export default {
  name: 'video-comp',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
<style scoped>
@import 'video-js.css';
</style>
