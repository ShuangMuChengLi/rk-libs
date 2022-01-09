<template>
  <remote-img
    class="img"
    width="500"
    :height="300"
    src="https://picsum.photos/id/100/500/300"
    :headers="{Authorization: 123}"
  />
</template>

<script>
import RemoteImg from './remote-img';
export default {
  name: 'RemoteImgDemo',
  components: {RemoteImg},
};
</script>

<style scoped lang="less">
/deep/.el-image__error{
  display: none;
}
</style>
