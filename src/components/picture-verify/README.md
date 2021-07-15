# 图片拼图验证码
## preview
[预览](./index.html#/demo/picture-verify-demo)
## download
[组件下载](./components/picture-verify.zip)
## dependence
Vue.js\ElementUI环境

## Attributes
| 参数 |	说明 |类型 |是否必填 | 可选值	| 默认值 |
| ---- | ---- |---- | ---- | ----   |----  | 
| width | 宽度 | Number | 否 | - | 400  | 
| height | 高度 | Number | 否 | - | 280  | 
| src | 图片的绝对路径 | String | 否 | - | 默认图片  | 
## event
| 事件名称 |	说明 |回调参数 |
| ---- | ---- |---- |
| success | 验证成功的事件 | - | 
| fail | 验证失败的事件 | - | 
## usage
```
<template>
  <picture-verify
    :width="400"
    :height="280"
    @success="success"
    @fail="fail"
  />
</template>

<script>
import PictureVerify from '@/components/picture-verify/picture-verify';
export default {
  name: 'PictureVerifyDemo',
  components: { PictureVerify },
  methods:{
    success(){
      this.$message.success('验证成功');
    },
    fail(){
      this.$message.error('验证失败');
    }
  }
};
</script>
```
