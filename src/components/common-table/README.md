# 可配置表格组件common-table
比较适用于字符串列较多的表格。
## preview
[预览](./index.html#/components/common-table)
## download
[组件下载](./components/common-table.zip)
## dependence
Vue.js、ElementUI

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| column | 列信息 | Array | true | -  |  - |
| data | 表格数据 | Array | true | -  |  - |
| pageInfo | 分页信息 | Array | false | -  |  - |
### column参数
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| prop | 列字段名，与slot二选一,如果是字符串直接渲染，如果是数组则分行渲染 | String/Array | false | -  |  - |
| slot | 插槽名，与prop二选一 | String | false | -  |  - |
| label | 列标题 | String | true | -  |  - |
| width | 列宽度 | Number/String | false | -  |  - |
### pageInfo
可选，用于分页后，序号列的序号与上一页连贯。
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| pageId | 当前页数 | Number | true | -  |  - |
| pageSize | 每页显示条目个数 | Number | true | -  |  - |
## usage
```
<template>
  <div class="demo-wrapper">
    <common-table
      :column="faceColumn"
      :data="faceList"
      :page-info="pageInfo"
    >
      <template v-slot:img="scope">
        <el-image :src="scope.row.img" />
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonTable from './common-table';
export default {
  name: 'CommonTableDemo',
  components: {CommonTable},
  data(){
    return {
      pageInfo: {
        pageId: 1,
        pageSize: 10,
      },
      faceColumn:[
        {
          prop: '',
          label: '抓拍照',
          width: null,
          slot: 'img'
        },
        {
          prop: 'name',
          label: '名字',
          width: null
        },
        {
          prop: ['datetime', 'address'],
          label: '时间/地点',
          width: null
        },
      ],
      faceList:[
        {
          img: 'https://picsum.photos/200/300',
          name: '张三',
          datetime: '2022-03-21 12:12:12',
          address: '软件园',
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
  .demo-wrapper{
    width: 800px;
    height: 600px;
  }
</style>

```
