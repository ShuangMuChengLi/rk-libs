<template>
  <div class="rk-add-file-demo">
    <rk-add-file
      @finish="addFileFun"
    >
      <div slot="choose">
        点击上传文件 slot
      </div>
    </rk-add-file>
    <img :src="base64Url" />
  </div>
</template>

<script>
import RkAddFile from './rk-add-file';
export default {
  name: 'RkAddFileDemo',
  components: {
    RkAddFile
  },
  data() {
    return {
      base64Url: ''
    };
  },
  methods: {
    addFileFun(files, base64) {
      this.base64Url = base64[0];
    }
  }
};
</script>

<style scoped lang="less">
  .rk-add-file-demo {
    & > img{
      width: 300px;
      height: 300px;
    }
  }
</style>
