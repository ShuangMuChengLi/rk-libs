<template>
  <div class="photo-wrapper">
    <image-width-error src="./photo.png" />
    <image-width-error
      src="./photo1.png"
      :enable-reload="true"
    />
  </div>
</template>

<script>
import ImageWidthError from './image-width-error';
export default {
  name: 'ImageWidthErrorDemo',
  components: {ImageWidthError}
};
</script>

<style scoped lang="less">
.photo-wrapper{
  width: 150px;
  height: 150px;
}
</style>
