# 文件上传

## preview
[预览](./index.html#/components/FileUpload/FileUploadDemo)

## download
[组件下载](./components/FileUpload.zip)

## dependence
Vue.js、Element

## attributes
名称 | 功能 | 默认值 | 可选值
--- | --- | --- | ---
uploadUrl | 文件上传路径 | 空 | `url 地址`
downloadUrl | 文档模板路径 | `/template/XXX-业务数据模板.xlsx` | 0.1 ~ 1
fileMax | 最多上传文件 | `1` | 1 ~ max
fileType | 上传文件类型 | `1` | `.xlsx`, `.xlsx`, `.doc`

## event

## usage

```vue
<template>
  <div class="components-container">
    <div class="el-row-wrapper">
      <el-row :gutter="10">
        <!--拖拽上传-->
        <drag-upload
          ref="importModal"
          :config="uploadConfig"
        />
        <!--弹出框上传-->
        <dialog-file-upload
          ref="dialogModal"
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
import DragUpload from './FileUpload';
import DialogFileUpload from './DialogFileUpload';

export default {
  name: 'FileUpload',
  components: { DragUpload, DialogFileUpload },
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
  watch: {},
  created() {},
  methods: {
    // 点击按钮弹出框上传
    upload() {
      this.$refs.importModal.show();
    },
    UploadFile() {
      this.$refs.dialogModal.show();
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
```

