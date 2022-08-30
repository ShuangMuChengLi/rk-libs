<template>
  <!-- 导入对话框 -->
  <el-dialog
    :title="config.title || '导入'"
    :visible.sync="open"
    width="500px"
    append-to-body
  >
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
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        :loading="isUploading"
        @click="submitFileForm"
      >
        确 定
      </el-button>
      <el-button
        plain
        type="danger"
        @click="open = false"
      >
        取 消
      </el-button>
    </div>
  </el-dialog>
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
  name: 'DialogFileUpload',
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
      open: false,
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
    // 确定
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>
<style lang="less" scoped>
  ::v-deep .el-upload {
    width: 100%;

    .el-upload-dragger {
      width: 100%;
      height: 200px;
    }
  }

  .el-upload__tip {
    .el-upload__tip {
      margin: 12px 0 10px;
    }
  }
</style>
