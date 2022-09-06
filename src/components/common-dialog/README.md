# 弹窗外壳（适用地图弹窗）
## preview
[预览](./index.html#/components/common-dialog)
## download
[组件下载](./components/common-dialog.zip)
## dependence
Vue.js

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| v-model | 是否显示 | Boolean | false | -  |  false |
| header | 弹窗标题 | String | false | -  |  - |
| isMapDialog | 是否地图弹窗（取消居中、始终显示、添加指针、无遮罩） | Boolean | false | -  |  false |
| isCenter | 是否居中 | Boolean | false | -  |  false |
## usage
```
<template>
  <common-dialog v-model="visible">
    共用弹窗
  </common-dialog>
</template>

<script>
import CommonDialog from './common-dialog';
export default {
  name: 'CommonDialogDemo',
  components: {CommonDialog},
  data(){
  	return {
		  visible: true
    };
  }
};
</script>
```
