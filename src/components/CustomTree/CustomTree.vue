<template>
  <div class="custom-tree">
    <custom-tree-node
      v-for="(item, index) in list"
      :key="item[nodeKey] || index"
      :data="item"
      :props="props"
      :default-expanded-keys="defaultExpandedKeys"
      :default-expanded-all="defaultExpandedAll"
      :level="level + 1"
      :node-key="nodeKey"
    >
      <template #default="slotProps">
        <slot
          :data="slotProps.data"
        />
      </template>
    </custom-tree-node>
  </div>
</template>

<script>
import CustomTreeNode from './CustomTreeNode/CustomTreeNode.vue';
export default{
  name: 'CustomTree',
  components: { CustomTreeNode },
  props: {
    data: {
      default() {
        return [];
      },
      type: Array
    },
    props: {
      default() {
        return {
          children: 'children',
          label: 'label'
        };
      },
      type: Object
    },
    nodeKey: {
      default: 'id',
      type: String
    },
    filterNodeMethod: {
      default() {
        return ()=>{};
      },
      type: Function
    },
    defaultExpandedKeys: {
      default() {
        return [];
      },
      type: Array
    },
    defaultExpandedAll: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return{
      level: 1,
      keyword: '',
      list: []
    };
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler() {
        this.list = this.data || [];
      }
    }
  },
  methods: {
    filter(val) {
      if(!val) {
        return this.list = this.data || [];
      }
      this.list = this.filterTreeData(this.data, val, this.filterNodeMethod, this.props.children);
    },
    filterTreeData(treeData, keyword, filterMethod, childrenKey = 'children') {
      if (!treeData || !treeData.length) return [];

      return treeData
        .map(item => ({ ...item })) // 浅拷贝节点避免修改原始数据
        .filter(item => {
          // 递归过滤子节点
          if (item[childrenKey]) {
            item[childrenKey] = this.filterTreeData(
              item[childrenKey],
              keyword,
              filterMethod,
              childrenKey
            );
          }

          // 保留条件：
          // 1. 当前节点匹配关键词
          // 2. 子节点列表不为空（即有匹配的子节点）
          return (
            filterMethod(keyword, item) ||
            (item[childrenKey] && item[childrenKey].length > 0)
          );
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "./CustomTree.scss";
</style>

