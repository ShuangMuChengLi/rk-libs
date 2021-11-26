<template>
  <remote-img
    class="img"
    width="500"
    :height="500 * (677/ 1205)"
    src="https://i.picsum.photos/id/1018/3914/2935.jpg?hmac=3N43cQcvTE8NItexePvXvYBrAoGbRssNMpuvuWlwMKg"
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
.img{
  margin: 50px;
  transition: transform .5s;
  &:hover{
    transform: translate(0, -3px);
    box-shadow:0 0 3px #333 ;
  }
}
</style>
