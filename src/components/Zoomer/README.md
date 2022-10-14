# 图片放大镜组件
鼠标在图片上时，显示放大镜效果
## contributor
纪爱妹
## preview
[预览](./index.html#/components/Zoomer)
## download
[组件下载](./components/Zoomer.zip)
## dependence
Vue.js

## Attributes
| 参数 |	说明 |类型 |可选值	| 是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | ----  | 
| src | 图片地址 | String | - | true  | -  |
| width | 宽度 | Number | - | false  | 100 |
| height | 高度 | Number | - | false  | 100 |
## usage
```
<template>
  <zoomer
    :src="'./photo.png'"
    :width="100"
    :height="100"
  />
</template>

<script>
import Zoomer from './Zoomer';
export default {
  name: 'ZoomerDemo',
  components: {Zoomer}
};
</script>

```
