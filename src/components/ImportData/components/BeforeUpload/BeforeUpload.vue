<template>
  <div class="steps">
    <StepItem
      :index="1"
      :title="steps[0].title"
      :desc="steps[0].desc"
    >
      <el-link
        :href="linkUrl"
        type="primary"
        class="mt5"
        style="color: #409EFF"
      >
        下载模板
      </el-link>
    </StepItem>
    <StepItem
      border
      :index="2"
      :title="steps[1].title"
      :desc="steps[1].desc"
    >
      <el-upload
        ref="upload"
        class="upload-btn mt5"
        :headers="{
          Authorization: token
        }"
        :accept="'.xls,.xlsx'"
        :action="uploadRealUrl"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-progress="handleProgress"
      >
        <el-link
          slot="trigger"
          size="normal"
          type="primary"
          style="color: #409EFF"
        >
          上传文件
        </el-link>
      </el-upload>
    </StepItem>
  </div>
</template>
<script>
import StepItem from '../StepItem/StepItem.vue';
import { getToken } from '@/utils/auth';
export default {
  name: 'BeforeUpload',
  components: { StepItem },
  mixins: [],
  props: {
    linkUrl: {
      type: String,
      default() {
        return '';
      }
    },
    uploadUrl: {
      type: String,
      default() {
        return '';
      }}
  },
  data() {
    let token = 'Bearer ' + getToken();
    return {
      token,
      fileList: [],
      steps: [
        {
          title: '填写导入的信息',
          desc: '请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除。'
        },
        {
          title: '上传填好的信息表',
          desc: '文件后缀名必须为xls 或xlsx （即Excel格式）。'
        }
      ]
    };
  },
  computed: {
    uploadRealUrl() {
      if(this.uploadUrl) {
        return process.env.VUE_APP_BASE_PREFIX + this.uploadUrl;
      }

      return '';
    }
  },
  watch: {},
  mounted() {},
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      let [fileObj = {}] = this.fileList;
      let fileName = fileObj.name;
      
      if (!fileName) {
        this.fileList = [];
      } else if (fileName && !(/^[\d|\D]*\.xlsx$/.test(fileName) || /^[\d|\D]*\.xls$/.test(fileName))) {
        this.fileList = [];
        this.$message.warning('文件后缀名必须为xls 或xlsx （即Excel格式）');
      }
      
      this.$emit('file-list-change', this.fileList);
    },

    handleSuccess(response) {
      this.$emit('upload-success', response);
    },

    handleError(err) {
      this.$emit('upload-error', err);
    },
    
    handleProgress(event) {
      this.$emit('upload-progress', event);
    },

    reset() {
      this.$refs.upload.clearFiles();
    },

    submit() {
      this.$refs.upload.submit();
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'BeforeUpload.scss';
</style>
