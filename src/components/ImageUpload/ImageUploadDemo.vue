<template>
  <div class="info-img">
    上传图片
    <image-upload
      ref="headImg"
      :image-url.sync="ruleForm.headImg"
    />
  </div>
</template>

<script>
import ImageUpload from './ImageUpload'; // 上传图片

export default {
  name: 'ImageUploadDemo',
  components: {
    ImageUpload
  },
  data() {
    return {
      oldHeadImg: '',
      ruleForm: {
        headImg: '',
      },
    };
  },
  created() {},
  methods: {}
};
</script>

<style>
  .info-img {
    padding: 10px;
  }
</style>