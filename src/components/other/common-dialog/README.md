# 弹窗外壳（适用地图弹窗）
## preview
[预览](./index.html#/components/other/common-dialog)
## download
[组件下载](./components/other/common-dialog.zip)
## dependence
Vue.js、elementUI

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| v-model | 是否显示 | Boolean | false | -  |  false |
| header | 弹窗标题 | String | false | -  |  - |
| isMapDialog | 是否地图弹窗（取消居中、始终显示、添加指针、无遮罩） | Boolean | false | -  |  false |
| width | 弹窗宽度 | String | false | -  |  - |
| height | 弹窗高度 | String | false | -  |  - |
| hasCover | 是否显示遮罩 | Boolean | false | -  |  false |
## usage
```
<template>
  <common-dialog
    v-model="dialogVisible"
    :header="'金桥市场东门卡口抓拍'"
    width="675px"
    height="300px"
  >
    <div class="dialog-body">
      <el-image
        class="img"
        src="https://picsum.photos/655/240"
        fit="contain"
      />
    </div>
  </common-dialog>
</template>

<script>
import CommonDialog from './common-dialog';
export default {
  name: 'CommonDialogDemo',
  components: {CommonDialog},
  data(){
    return {
      dialogVisible: true
    };
  }
};
</script>

<style scoped lang="less">
.dialog-body{
  flex: auto;
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
  .img{
    width: 100%;
    height: 100%;
  }
}
</style>

```
