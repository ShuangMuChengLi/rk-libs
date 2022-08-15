<template>
  <zoomer
    :src="'./photo.png'"
    :width="100"
    :height="100"
  />
</template>

<script>
import Zoomer from './Zoomer';
export default {
  name: 'ZoomerDemo',
  components: {Zoomer}
};
</script>

<style scoped lang="less">
</style>
