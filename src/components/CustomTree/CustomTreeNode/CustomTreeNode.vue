<template>
  <div class="node">
    <div class="node-bar">
      <div class="left">
        <i
          v-if="data && data[props.children] && data[props.children].length"
          class="expand-icon"
          :class="{
            'el-icon-caret-bottom': expand,
            'el-icon-caret-right': !expand
          }"
          @click="expand = !expand"
        />
      </div>
      <div class="right">
        <slot
          :data="data"
          :level="level"
        />
      </div>
    </div>
    
    <div
      v-if="expand && data && data[props.children] && data[props.children].length"
      class="children"
    >
      <custom-tree-node
        v-for="(item, index) in data[props.children]"
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
            :level="slotProps.level"
          />
        </template>
      </custom-tree-node>
    </div>
  </div>
</template>

<script>
export default{
  name: 'CustomTreeNode',
  props: {
    data: {
      default() {
        return {};
      },
      type: Object
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
    level: {
      default: 1,
      type: Number
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
      expand: false
    };
  },
  watch: {
    defaultExpandedKeys: {
      immediate: true,
      handler(val) {
        if(!_.isEmpty(val) && val.includes(this.data[this.nodeKey])) {
          this.expand = true;
        }
      }
    },
    defaultExpandedAll: {
      immediate: true,
      handler(val) {
        if(val) {
          this.expand = true;
        }
      }
    },

  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
@import "./CustomTreeNode.scss";
</style>

