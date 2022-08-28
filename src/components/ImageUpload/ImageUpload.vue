<template>
  <div class="cropper-image-upload-page">
    <div
      class="cropper-image"
      @click="chooseImage"
      @mouseenter="mouseenterHandler"
      @mouseleave="mouseleaveHandler"
    >
      <i
        v-if="!imgUrl"
        class="el-icon-plus"
      />
      <img
        v-else
        :src="imgUrl"
        alt="裁剪图片"
      >
      <div
        v-show="imgUrl && maskShow"
        class="mask"
      >
        <i
          class="el-icon-delete"
          @click.stop="clearImg"
        />
      </div>
      <input
        v-model="imgUrl"
        type="hidden"
        placeholder="请选择图片"
      >
    </div>
    <el-dialog
      title="图片上传"
      :visible.sync="imageDialog"
      width="900px"
    >
      <cropper-image
        :img-url.sync="imgUrl"
        @uploadImgSuccess="uploadImgSuccessHandler"
      />
    </el-dialog>
  </div>
</template>

<script>
import CropperImage from './CropperImage';

export default {
  name: 'ImageUpload',
  components: {
    CropperImage
  },
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() { 
    return { 
      imageDialog: false,
      maskShow: false
    };
  },  
  methods: {
    // 删除图片
    clearImg() {
      this.$emit('update:imgUrl', '');
    },   
    // 选择图片
    chooseImage() {
      this.imageDialog = true;
    },
    // 鼠标移入
    mouseenterHandler() {
      this.maskShow = true;
    },  
    // 鼠标离开
    mouseleaveHandler() {
      this.maskShow = false;
    }, 
    // 上传成功
    uploadImgSuccessHandler(url) {
      this.$emit('update:imgUrl', url);
    } 
  }   
}; 
</script>
  
 <style scoped lang="less">
  @import "./Cropeper.less";
</style>
