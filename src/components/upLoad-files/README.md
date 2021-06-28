# 图片base64拖拽上传控件
## preview
[预览](./index.html#/demo/up-load-files-demo)
## download
[组件下载](./components/up-load-files-demo.zip)
## dependence
Vue.js、ElementUI环境

## Attributes
null
## Events
| 事件名称 |	说明 |回调参数 |
| ---- | ---- |---- | 
| upDateFiles | 选取图片后的回调 | 上传图片的base64 | 
## usage
```
<template>
  <div>
    <up-load-files @upDateFiles="upDateFiles" />
  </div>
</template>

<script>
import UpLoadFiles from '@/components/upLoad-files/up-load-files';
export default {
  name: 'UpLoadFilesDemo',
  components: { UpLoadFiles },
  methods: {
    upDateFiles(file) {
      console.log(file);
    }
  }
};
</script>

```
