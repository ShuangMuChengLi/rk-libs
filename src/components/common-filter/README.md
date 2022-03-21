# 可配置筛选栏表单common-filter
## preview
[预览](./index.html#/components/common-filter)
## download
[组件下载](./components/common-filter.zip)
## dependence
Vue.js、ElementUI

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| formInfo | 筛选栏信息 | Array | true | -  |  - |
### column参数
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| prop | 字段名 | String/Array | true | -  |  - |
| label | 字段标题 | String | true | -  |  - |
| type | 字段类型 | String | true | 'dateRange'、'select'、'input'  |  - |
| options | 下拉框的选项列表 | Array | false | -  |  - |
## event
| 事件名称 |	说明 |回调参数 |
| ---- | ---- |---- |
| submit | 提交事件 | 筛选表单数据 | 
## usage
```
<template>
  <common-filter
    :form-info="dangerAreaFilter"
    @submit="query"
  />
</template>
<script>
import CommonFilter from './common-filter';
export default {
  name: 'CommonFilterDemo',
  components: {CommonFilter},
  data(){
    return {
      dangerAreaFilter: [
        {
          label: '漫入日期',
          prop: ['mrqssj', 'mrjssj'],
          type: 'dateRange'
        },
        {
          label: '人员状态',
          prop: 'ryzt',
          type: 'select',
          options: [
            {
              label: '14天以内',
              value: '1014'
            },
            {
              label: '14天以上',
              value: '2014'
            }
          ]
        },
        {
          label: '中高风险地',
          prop: 'fxdj',
          type: 'select',
          options: [
            {
              label: '高风险',
              value: '1'
            },
            {
              label: '中风险',
              value: '2'
            },
            {
              label: '低风险',
              value: '3'
            },
          ]
        },
        {
          label: '浸入地',
          prop: 'mrd',
          type: 'input',
        },
        {
          label: '关键字',
          prop: 'keyword',
          type: 'input',
        }
      ],
      form: {}
    };
  },
  methods:{
    query(form){
      this.form = form;
      this.getList();
    },
    getList(){

    }
  }
};
</script>

<style scoped>

</style>

```
