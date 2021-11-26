# 可以带请求头的图片组件   
需求：项目中请求图片，需要带头部token进行验证，而原生及ElementUI不支持
## preview
[预览](./index.html#/demo/remote-img)
## download
[组件下载](./components/remote-img.zip)
## dependence
Vue.js、ElementUI、axios

## Attributes
| 参数 |	说明 |类型 |是否必填 | 可选值	| 默认值 |
| ---- | ---- |---- | ---- | ----   |----  | 
| src | 图片的绝对路径 | String | 是 | - | -  | 
| width | 宽度 | [Number, String] | 否 | - | 100%  | 
| height | 高度 | [Number, String] | 否 | - | 100%  | 
| headers | 图片请求头 | Object | 否 | - | null  | 
## usage
```
<template>
  <remote-img
    width="500"
    height="500"
    src="/huabanimg/img/home/banner/1a6ad3b820b1246aa6340a1a64546c58a735fc8520679e"
    :headers="{Authorization: 123}"
  />
</template>

<script>
import RemoteImg from './remote-img';
export default {
  name: 'RemoteImgDemo',
  components: {RemoteImg},
};
</script>
```
