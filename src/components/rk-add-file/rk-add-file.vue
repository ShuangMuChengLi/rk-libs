<!--文件上传-->
<!--
  props:
    fileType [文件支持的类型]
    fileSuffix [文件扩展名（文件后缀）]
    isDrag [是否可拖拽]
    isBase [是否要转成base64] 默认 true
    isMultiple [是否多选]
  slot:
    drag 拖拽
    choose 文件选择
  emit:
    finish
-->
<template>
  <div class="file-choose-box">
    <div
      v-if="isDrag"
      @dragover.prevent
      @drop="fileDrop"
    >
      <slot name="drag" />
    </div>
    <label>
      <input
        type="file"
        :multiple="isMultiple"
        @change="fileChange"
      >
      <slot name="choose" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'AddFile',
  props: {
    // 文件支持的类型
    fileType: {
      'type': String,
      'default': 'image/jpeg,image/png,image/bmp'
    },
    // 文件扩展名（文件后缀）
    fileSuffix: {
      'type': String,
      'default': 'jpeg,jpg,png,bmp'
    },
    // 是否可拖拽
    isDrag: {
      'type': Boolean,
      'default': false
    },
    // 是否要转成base64
    isBase: {
      'type': Boolean,
      'default': true
    },
    isMultiple: {
      'type': Boolean,
      'default': false
    }
  },
  data() {
    return {
      filesBase: [],
      filesSelf: []
    };
  },
  methods: {
    /**
     * 点击 上传图片
     */
    async fileChange(event) {
      let fileObj = event.target.files;
      await this.filterFile(fileObj);

      if(this.filesSelf.length > 0){
        this.$emit('finish', this.filesSelf, this.filesBase);
        event.target.value = '';
        this.filesBase = [];
        this.filesSelf = [];
      }
    },
    /**
     * 拖拽上传
     */
    async fileDrop(event){
      if (!this.isDrag){
        return false;
      }

      event.preventDefault();
      let fileObj = event.dataTransfer.files;
      await this.filterFile(fileObj);

      if(this.filesSelf.length > 0){
        this.$emit('finish', this.filesSelf, this.filesBase);
        this.filesBase = [];
        this.filesSelf = [];
      }
    },
    /**
     * 判断 图片类型、图片数量
     */
    async filterFile(fileObj){
      let typeAry = [];
      if(this.fileType) {
        typeAry = this.fileType.split(',');
      }
      let suffixAry = [];
      if(this.fileSuffix) {
        suffixAry = this.fileSuffix.split(',');
      }
      for(let obj of fileObj) {
        let nameAry = obj.name.split('.');
        let suffix = nameAry[nameAry.length - 1];

        if(suffixAry.length > 0 || typeAry.length > 0) {
          let suffixIndex = suffixAry.indexOf(suffix);
          let typeIndex = typeAry.indexOf(obj.type);
          if(typeIndex < 0 && suffixIndex < 0){
            this.$message.warning('文件格式错误');
            continue;
          }
        }

        this.filesSelf.push(obj);
        if(this.isBase){
          await this.getBase64Url(obj);
        }
      }
    },
    /**
     * 图片 转base64
     */
    async getBase64Url(file) {
      let uploadFile = new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
      await uploadFile.then((result) => {
        this.filesBase.push(result);
      });
    }
  }
};
</script>

<style scoped lang="less">
  .file-choose-box{
    input{
      display: none;
      opacity: 0;
    }
  }
</style>
