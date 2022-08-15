<template>
  <div class="video-player-plugin-preview">
    <img
      :src="preview"
      alt="预览"
    >
  </div>
</template>
<script>
import preview from './preview-image/preview.png';
export default {
  props: {
  },
  data() {
    return {
      preview
    };
  },
  methods: {
      
  }
};
</script>
<style lang="less" scoped>

</style>