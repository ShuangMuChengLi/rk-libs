<template>
  <!-- 导入 -->
  <div>
    <el-upload
      ref="upload"
      :limit="config.fileMax"
      :accept="config.fileType"
      action="string"
      :disabled="isUploading"
      :on-progress="handleFileUploadProgress"
      :auto-upload="false"
      :http-request="importFile"
      drag
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div
        slot="tip"
      >
        <span>仅允许导入{{ config.fileMax }}个{{ config.fileType }}格式文件。</span>
        <el-link
          type="primary"
          :underline="false"
          @click="importTemplate"
        >
          下载模板
        </el-link>
      </div>
    </el-upload>
    <el-button
      type="primary"
      :loading="isUploading"
      @click="submitFileForm"
    >
      保存
    </el-button>
  </div>
</template>
<script>
import axios from 'axios';
const fileHeader = {
  headers: {
    Authorization: 'Bearer ' + '',
    'Content-Type': 'multipart/form-data',
  },
};

export default {
  name: 'Upload',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isUploading: false, 
    };
  },
  methods: {
    // 下载模板
    importTemplate() {
      window.location.href = this.config.downloadUrl;
    },
    /**
     * 导入文件
     */
    importFile(params) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append('uploadFile', params.file);
      this.importFileGallery(this.config.uploadUrl, formData);
    },
    /**
     * 导入
     * @param url 请求路径
     * @param params 请求参数
     */
    async importFileGallery(url, params, callback) {
      axios
        .post(url, params, fileHeader)
        .then((res) => {
          this.isUploading = false;
          if (res.data.code === 200) {
            this.$message({
              message: '导入成功',
              type: 'success',
            });
          } else {
            this.$message({
              message: '导入失败',
              type: 'error',
            });
          }
        })
        .catch((error) => {
          this.isUploading = false;
          this.$message({
            message: '导入失败',
            type: 'error',
          });
        });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.isUploading = true;
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>
<style lang="less" scoped>
  .dialog-footer {
    margin-top: 32px;
  }

  ::v-deep .el-upload {
    width: 100%;

    .el-upload-dragger {
      width: 100%;
      height: 200px;
    }
  }

  .el-button {
    padding: 5px 10px;
    margin-top: 10px;
  }
</style>
