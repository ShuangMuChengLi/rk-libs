<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <template #title>
        <div class="custom-dialog-title">
          <slot name="icon">
            <i class="el-icon-info" />
          </slot>{{ title }}
        </div>
      </template>

      <!-- content -->
      <BeforeUpload
        v-show="status === 'before-upload'"
        ref="upload"
        :link-url="linkUrl"
        :upload-url="uploadUrl"
        @file-list-change="fileList = $event"
        @upload-success="handleSuccess"
        @upload-error="handleError"
        @upload-progress="handleProgress"
      />
      <Loading
        v-if="status === 'loading'"
        :percent="progressPercent"
      />
      <UploadStatus
        v-else-if="['success', 'fail'].includes(status)"
        :status="status"
        :msg="message"
        :show-error="status === 'fail'"
        @done="update"
        @show-error-detail="showErrorTable"
      />
      <!-- footer -->
      <div
        v-if="!['success', 'fail'].includes(status)"
        slot="footer"
      >
        <el-button @click="close">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handelConfirm"
        >
          确定
        </el-button>
      </div>
      <!-- 错误数据 -->
      <InnerTable
        :visible.sync="showTable"
        :close-on-click-modal="false"
        :list="errorData"
        :columns="columns"
      />
    </el-dialog>
  </div>
</template>
<script>
import BeforeUpload from './components/BeforeUpload/BeforeUpload.vue';
import InnerTable from './components/InnerTable/InnerTable.vue';
import Loading from './components/Loading/Loading.vue';
import UploadStatus from './components/UploadStatus/UploadStatus.vue';

export default {
  components: { BeforeUpload, Loading, UploadStatus, InnerTable },
  inheritAttrs: false,
  props: {
    linkUrl: {
      type: String,
      default() {
        return '';
      }
    },
    uploadUrl: {
      require: true,
      type: String,
      default() {
        return '';
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      title: '批量导入',
      statusEnums: ['before-upload', 'success', 'fail', 'loading'],
      status: 'before-upload', // 'before-upload' 'success' 'fail'
      message: '', // 上传成功/失败
      fileList: [],
      progressPercent: 0,
      showTable: false, // 具体错误表格
      errorData: [] // 错误数据
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {
      this.errorData = [];
      this.progressPercent = 0;
      this.fileList = [];
      this.$refs['upload'] && this.$refs['upload'].reset();
      this.setStatus('before-upload');
    },
    onClose() {},
    close() {
      this.$emit('update:visible', false);
    },
    handelConfirm() {
      if (!this.fileList.length) return this.$message.warning('未选择要上传的文件');
      this.$refs.upload.submit();
      this.setStatus('loading');
    },

    setStatus(val) {
      if (this.statusEnums.includes(val)) {
        this.status = val;
      }
    },

    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },

    // 上传成功回调
    handleSuccess(response) {
      let { code, msgKey, message, data } = response;
      this.message = message;
      if (code === 200 && msgKey === 'success') {
        let status = '';
        if (data instanceof Array && data.length) {
          // 有错误数据
          status = 'fail';
          this.errorData = data;
        } else {
          status = 'success';
          this.errorData = [];
        }
        setTimeout(() => {
          this.setStatus(status);
        }, 500);
      } else {
        this.$message.error(message);
        setTimeout(() => {
          this.setStatus('fail');
          this.errorData = [];
        }, 500);
      }
    },
    handleError(err) {
      try {
        let data = JSON.parse(err.message);
        this.$message.error(data.message);
      } catch (error) {
        console.error('JSON解析失败', error);
      }
      this.setStatus('fail');
    },
    handleProgress(event) {
      this.progressPercent = event.percent;
    },
    update() {
      this.$emit('update');
      this.close();
    },

    // 显示具体错误行
    showErrorTable() {
      this.showTable = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'ImportData.scss';
</style>