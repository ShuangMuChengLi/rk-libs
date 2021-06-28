<!--单张图片上传-->
<template>
  <div class="row-content row-special">
    <div
      class="upfiles"
      @drop="imgDrop"
      @dragover.prevent
    >
      <label
        v-show="!isFileReader"
        class="file-choose"
      >
        <p class="text">将图片拖到这里，仅支持单张图片，</p>
        <p class="text">支持上传jpg、png、bmp格式图片</p>
        <input
          id="upImg"
          ref="fileImg"
          type="file"
          multiple
          @change="imgChange"
        >
        <i class="el-icon-plus" />
      </label>
      <div
        v-if="isFileReader"
        class="img-view"
      >
        <div
          class="img-box"
          @click="reader = false"
        >
          <i
            class="el-icon-remove-outline"
            @click="delImg()"
          />
          <el-image
            :src="file"
            fit="contain"
            @click="changeImg"
          />
          <!--<img
            :src="file"
            alt="搜索图片"
            @click="changeImg"
          >-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UpLoadFiles',
  props: {
    defaultImg: {
      type: String,
      default: null
    },
    imgMax: {
      type: Number,
      default: 10
    },
    width: {
      type: Number,
      default: 388
    },
    height: {
      type: Number,
      default: 108
    }
  },
  data() {
    return {
      file: '',
      isFileReader: false,
      reader: false
    };
  },
  computed: {
    setStyle() {
      return { width: `${this.width}px`, height: `${this.height}px` };
    }
  },
  watch: {
    defaultImg: {
      handler(newVal){
        if (!newVal) return;

        this.isFileReader = true;
        this.file = newVal;
      },
      immediate: true,
      deep: true
    },
  },
  mounted() {
    // if(!this.defaultImg) return;

    // this.isFileReader = true;
    // this.file = this.defaultImg;
  },
  beforeUnmount() {
  },
  emits: ['upDateFiles'],
  methods: {
    /**
     * 自动弹出上传文件弹窗
     */
    changeImg() {
      document.getElementById('upImg').click();
    },
    /**
     * 拖拽上传
     */
    imgDrop(event){
      event.preventDefault();
      const fileObj = event.dataTransfer.files;

      this.getImg(fileObj);
    },
    getImg(fileObj){
      this.isFileReader = false;
      // 图片格式判断
      const typeAry = ['jpeg', 'png', 'bmp'];
      const type = fileObj[0].type.split('/')[1].toLowerCase();
      const index = typeAry.indexOf(type);
      if (index < 0){
        this.$message.info('仅支持上传jpg、png、bmp格式的图片');
        return;
      }

      // 图片大小判断
      const fileSize = Number(fileObj?.[0]?.size);

      if (!fileSize || fileSize > 1024 * 1024 * 3) {
        this.$message.info('图片不能最大不能超过3M');
        return;
      }
      const emitFile = () => {
        this.$emit('upDateFiles', this.file);
      };
      this.isFileReader = true;
      this.getUrl(fileObj[0], emitFile);
    },
    /**
     * 点击上传
     */
    imgChange(){
      const fileObj = this.$refs.fileImg.files;
      this.getImg(fileObj);
      this.$refs.fileImg.value = '';
    },
    /**
     * 图片预览
     */
    getUrl(file, fn) {
      this.reader = true;
      const uploadFile = new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
      uploadFile.then((result) => {
        this.file = result;
        fn();
      });
    },
    /**
     * 删除图片
     */
    delImg(){
      this.file = '';
      this.isFileReader = false;
      this.$emit('upDateFiles', this.file);
    },
  }
};
</script>
<style scoped lang="less">
  @import 'up-load-files';
</style>
