<template>
  <div class="components-container">
    <div class="el-row-wrapper">
      <el-row :gutter="10">
        <!--拖拽上传-->
        <file-upload
          ref="fileUpload"
          :config="uploadConfig"
        />
        <!--弹出框上传-->
        <dialog-file-upload
          ref="dialogFileUpload"
          :config="uploadConfig"
        />
        <el-button
          type="primary"
          class="btn"
          @click="UploadFile"
        >
          点击弹出框上传
        </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import FileUpload from './FileUpload';
import DialogFileUpload from './DialogFileUpload';

export default {
  name: 'FileUploadDemo',
  components: { FileUpload, DialogFileUpload },
  data() {
    return {
      uploadConfig: {
        uploadUrl: '/personal/v1/farm/importData', // 文件上传路径
        downloadUrl: '/template/XXX-业务数据模板.xlsx', // xlsx放到public/template路径下
        fileMax: 1, // 最多上传1个文件
        fileType: '.xlsx, .xlsx, .doc' // 上传文件类型
      },
    };
  },
  methods: {
    // 点击按钮弹出框上传
    UploadFile() {
      this.$refs.dialogFileUpload.open = true;
    },
  },
};
</script>

<style lang="less" scoped>
  .el-row-wrapper {
    width: 400px;
    margin: 15px 20px;

    .btn {
      margin-top: 10px;
    }
  }
</style>