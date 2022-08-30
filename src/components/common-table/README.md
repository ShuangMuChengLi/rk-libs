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
| pageInfo | 分页信息 | Array | true | -  |  - |
| total | 总数 | Number | true | -  |  - |
| has-selection | 是否有选择框 | Boolean | false | -  |  - |
### column参数
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| prop | 列字段名，优先级3,如果是字符串直接渲染，如果是数组则分行渲染 | String/Array | false | -  |  - |
| slot | 插槽名，优先级1 | String | false | -  |  - |
| fn | 渲染函数，优先级2,回调函数参数是该行数据，返回值是列表渲染数据 | Function | false | -  |  - |
| label | 列标题 | String | true | -  |  - |
| width | 列宽度 | Number/String | false | -  |  - |
| type | 类型 | String | false | img、slot、normal、popover、Array、fn  | normal |
| linkFn | 点击后的链接函数 | Function | false | -  |  - |
### pageInfo
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| pageId | 当前页数 | Number | true | -  |  - |
| pageSize | 每页显示条目个数 | Number | true | -  |  - |
## Events
| 事件名称 |	说明 |回调参数 |
| ---- | ---- |---- | 
| imgClick | type为图片时，点击图片的回调函数 | row, index, prop | 
| rowClick | 点击行时回调 | row | 
| pageChange | 分页改变时回调 | - | 
| selectionChange | 选择框选择后的回调 | list | 
## usage
```
<template>
  <div class="demo-wrapper">
    <common-table
      :column="columnConfig"
      :data="list"
      :total="total"
      :page-info.sync="pageInfo"
      :has-selection="true"
      @imgClick="imgClick"
      @rowClick="rowClick"
      @pageChange="pageChange"
      @selectionChange="selectionChange"
    >
      <template v-slot:handler="scope">
        <el-button
          type="primary"
          size="mini"
          @click="view(scope.row)"
        >
          查看
        </el-button>
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
	    total: 100,
	    columnConfig:[
        {
          prop: 'img',
          label: '抓拍照',
          width: null,
          type: 'img'
        },
        {
          prop: 'name',
          label: '名字',
          width: null
        },
        {
          label: '状态',
          width: null,
          fn(row){
            if(row.state === 1){
              return '在线';
            }else{
              return '离线';
            }
          }
        },
        {
          prop: ['datetime', 'address'],
          label: '时间/地点',
          width: null
        },
        {
          prop: 'handler',
          label: '操作',
          width: null,
          slot: 'handler'
        },
      ],
      list:[
        {
          img: './photo.png',
          name: '张三',
          datetime: '2022-03-21 12:12:12',
          address: '软件园',
          state: 1
        }
      ]
    };
  },
  methods:{
	  selectionChange(val){
		  console.log(val);
	  },
	  rowClick(row){
	  	console.log(row);
	  },
	  imgClick(row, index, prop){
	  	console.log(row, index, prop);
	  },
	  pageChange(){
	  	console.log('pageChange');
    },
	  view(row){
	  	console.log(row);
    }
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
