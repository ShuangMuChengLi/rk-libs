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