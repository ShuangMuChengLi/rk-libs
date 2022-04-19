# 图片组件
图片加载错误时可定时重载，可设置错误图片
## preview
[预览](./index.html#/components/image-width-error)
## download
[组件下载](./components/image-width-error.zip)
## dependence
Vue.js、elementUi

## Attributes
| 参数 |	说明 |类型 |可选值	| 是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | ----  | 
| src | 图片地址 | String | - | true  | -  |
| emptyImgType | 发生错误时，默认展示的内置图片类型，当errorSrc不为空时失效。1是黑色图片，2是白色图片 | Number、String | - |false | 1  | 
| enableReload | 发生错误时，是否允许重新加载 | Array | -  | false | false  | 
| reloadSeconds | 发生错误时，每几秒重新加载 | Number | - | false  | 1 |
| errorSrc | 发生错误时，默认展示的图片地址 | String | - | false  | null |
## usage
```
<template>
  <div class="photo-wrapper">
    <image-width-error src="./photo.png" />
    <image-width-error
      src="./photo1.png"
      :enable-reload="true"
    />
  </div>
</template>

<script>
import ImageWidthError from './image-width-error';
export default {
  name: 'ImageWidthErrorDemo',
  components: {ImageWidthError}
};
</script>

<style scoped lang="less">
.photo-wrapper{
  width: 150px;
  height: 150px;
}
</style>

```
