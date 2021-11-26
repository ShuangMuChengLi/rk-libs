<template>
  <remote-img
    width="500"
    height="500"
    src="/huabanimg/img/home/banner/1a6ad3b820b1246aa6340a1a64546c58a735fc8520679e"
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

<style scoped>

</style>
