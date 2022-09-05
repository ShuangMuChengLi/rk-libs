# 可拖拽弹窗dialog-drag
## preview
[预览](./index.html#/demo/dialogDrag)
## download
[js下载](./components/other/dragZoom.zip)
## dependence
Vue.js、ElementUI

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
|  |  |  |  | -  |  - |
### column参数
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
|  | 列 |  |  | -  |  - |
### pageInfo
可选，用于分页后，序号列的序号与上一页连贯。
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
|  |  |  |  | -  |  - |
## usage
```
<template>
  <div>
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>
    <el-dialog :visible.sync="dialog" title="弹窗" width="400px" v-dialogDrag>
      <div>
        <div>1、鼠标移到头部，点击拖拽</div>
        <div>2、鼠标移到边框，点击拖拽改变弹窗大小</div>
      </div>
      <span slot="footer">
        <el-button size="small" @click="dialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import './dialogDrag';
export default {
  name: 'DialogDrag',
  data() {
    return {
      dialog: true
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    openDialog(){
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
```
