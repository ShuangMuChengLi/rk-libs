<template>
  <div class="wrapper">
    <select-tree
      v-model="value"
      :tree-data="treeData"
      :only-leaf="false"
      placeholder="请选择节点"
      tree-key="value"
      :tree-props="{
        label: 'name'
      }"
    />
  </div>
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
<style lang="less" scoped>
  .wrapper{
    margin: 30px;
  }
</style>
