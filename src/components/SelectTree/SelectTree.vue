<template>
  <div
    ref="select-tree"
    class="select-tree"
  >
    <el-popover
      v-model="visible"
      :width="popoverWidth"
      placement="bottom"
      trigger="click"
    >
      <el-tree
        ref="tree"
        class="tree"
        :data="treeData"
        :show-checkbox="multiple"
        :node-key="nodeKey"
        :load="loadNode"
        :lazy="lazy"
        highlight-current
        :props="{
          label: 'label',
          children: 'children',
          ...treeProps
        }"
        v-bind="$attrs"
        @check="handleCheckChange"
        @current-change="handleClickChange"
      >
        <span
          slot-scope="{ node, data }"
        >
          <slot
            :node="node"
            :data="data"
          >
            <span
              class="label"
            >{{ node.label }}</span>
          </slot>
        </span>
      </el-tree>
      <template #reference>
        <div
          class="el-input"
          :class="`el-input--${size}`"
        >
          <div class="el-input__inner">
            <div
              v-if="!value"
              class="placeholder"
            >
              {{ placeholder }}
            </div>
            <template v-else-if="multiple">
              <div
                v-for="item in checkList"
                :key="item[nodeKey]"
                class="tag el-tag el-tag--info el-tag--small el-tag--light"
              >
                <span class="el-select__tags-text">{{ item[labelKey] }}</span>
                <i
                  class="el-tag__close el-icon-close"
                  @click.stop="handleRemove(item[nodeKey])"
                />
              </div>
            </template>
            <template v-else-if="!multiple">
              <span class="value">{{ selectObj[labelKey] }}</span>
              <i
                class="el-icon-close"
                @click.stop="clear"
              />
            </template>
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'SelectTree',
  props: {
    value: {
      type: [Array, String, Number, Object],
      default: null
    },
    checkFilterFn: {
      type: Function,
      default: null
    },
    treeData: {
      type: Array,
      default: null
    },
    multiple: {
      type: Boolean,
      default: true
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    treeProps: {
      type: Object,
      default: null
    },
    onlyLeaf: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    loadNode: {
      type: Function,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
      visible: false,
      checkNode: [],
      selectNode: '',
      checkList: [],
      selectObj: {},
      popoverWidth: ''
    };
  },
  computed: {
    labelKey() {
      return this.treeProps?.label || 'label';
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.handleUpdateValue();
      }
    }
  },
  mounted() {
    this.handleUpdateValue();
    this.popoverWidth = this.$refs['select-tree'].clientWidth;
  },
  methods: {
    
    handleRemove(value) {
      this.$refs.tree.setChecked(value, false, true);
      this.handleCheckChange();
    },
    handleCheckChange() {
      if (this.onlyLeaf) {
        this.checkList = this.$refs.tree
          ?.getCheckedNodes()
          .filter((i) => i.isLeaf);
        this.checkNode = this.checkList.map((i) => i[this.nodeKey]);
      } else {
        this.checkList = this.$refs.tree?.getCheckedNodes();
        this.checkNode = this.checkList.map((i) => i[this.nodeKey]);
      }
      this.$emit('input', this.checkNode);
      this.$emit('change', this.checkList);
    },
    handleClickChange() {
      if (this.multiple) return;
      
      let selectObj = this.$refs.tree.getCurrentNode();
      if(this.checkFilterFn && !this.checkFilterFn(selectObj)) {
        return;
      }

      this.selectObj = selectObj;
      this.$emit('change', this.selectObj[this.nodeKey]);
      this.$emit('input', this.selectObj[this.nodeKey]);
      this.visible = false;
    },
    clear() {
      this.$emit('change', null);
      this.$emit('input', null);
    },
    handleUpdateValue() {
      if (this.multiple) {
        if (!_.isEqual(this.value, this.checkNode)) {
          this.$refs.tree.setCheckedKeys(this.value || []);
          this.handleCheckChange();
        }
      } else {
        if (!_.isEqual(this.value, this.selectNode)) {
          if (!this.value || !this.$refs.tree.getNode(this.value)) return;

          this.$refs.tree.setCurrentKey(this.value);
          this.handleClickChange();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.select-tree {
  width: 100%;
  .el-input {
    cursor: pointer;
    .el-input__inner{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      .value{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: auto;
      }
      .el-icon-close{
        flex-shrink: 0;
        cursor: pointer;
        visibility: hidden;
      }
      &:hover{
        .el-icon-close{
          visibility:visible;
        }
      }
      
    }
    
  }
  .placeholder {
    font-size: 14px;
    color: #999;
  }
  .tag + .tag {
    margin-left: 1px;
  }
}
</style>