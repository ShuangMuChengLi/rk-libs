# 下拉选择树组件
支持下拉单选或多选树
## contributor
林佳男
## preview
[预览](./index.html#/components/SelectTree/SelectMoreDemo)
## download
[组件下载](./components/SelectTree.zip)
## dependence
Vue.js

## Attributes
| 参数 |	说明 |类型 |可选值	| 是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | ----  | 
| value | 支持v-model双向绑定 | String Array Number | - | null  | -  |
| treeData | 下拉树数据 | Array | - | true  | null |
| multiple | 是否多选 | Boolean | - | false  | true |
| treeKey | 树节点的唯一表示 | String | - | false  | 'id' |
| treeProps | 树的其他配置项,参考element el-tree | Object | - | false  | null |
| onlyLeaf | 多选情况下是否只选择子节点，每个子节点需配置isLeaf字段 | Boolean | - | false  | false |
| lazy | 是否懒加载 | Boolean | - | false  | false |
| loadNode | 懒加载回调 | Function | - | false  | () => {} |
| placeholder | 输入框备注 | String | - | false  | '请选择' |
| size | 下拉树数据 | String | medium/small/mini | false  | 'medium' |
## usage
```
<template>
  <select-tree
    v-model="value"
    :treeData="treeData"
    :onlyLeaf="false"
    placeholder="请选择节点"
    treeKey="value"
    :treeProps="{
      label: 'name'
    }"
  />
</template>

<script>
import SelectTree from './SelectTree';
export default {
  name: 'SelectTreeDemo',
  components: {SelectTree},
  data(){
    return {
      value:[],
      treeData: [
        {
          value: '1',
          name: '测试1',
          children: [
            {
              value: '2',
              name: '测试2'
            },
            {
              value: '3',
              name: '测试3'
            },
            {
              value: '4',
              name: '测试4'
            }
          ]
        },
        {
          value: '5',
          name: '测试5'
        },
        {
          value: '6',
          name: '测试6'
        }
      ]
    };
  }
};
</script>

```
