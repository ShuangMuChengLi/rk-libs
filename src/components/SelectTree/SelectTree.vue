<template>
  <div class="select-tree" ref="select-tree">
    <el-popover :width="popoverWidth" placement="bottom" trigger="click">
      <el-tree
        class="tree"
        :data="treeData"
        :show-checkbox="multiple"
        :node-key="treeKey"
        ref="tree"
        :load="loadNode"
        :lazy="lazy"
        highlight-current
        :props="{
          label: 'label',
          children: 'children',
          ...treeProps
        }"
        @check="handleCheckChange"
        @current-change="handleClickChange"
      >
      </el-tree>
      <template v-slot:reference>
        <div class="el-input" :class="`el-input--${size}`">
          <div class="el-input__inner">
            <div v-if="!value || !value.length" class="placeholder">
              {{ placeholder }}
            </div>
            <template v-else-if="multiple">
              <div
                class="tag el-tag el-tag--info el-tag--small el-tag--light"
                v-for="item in checkList"
                :key="item[treeKey]"
              >
                <span class="el-select__tags-text">{{ item[labelKey] }}</span>
                <i
                  class="el-tag__close el-icon-close"
                  @click.stop="handleRemove(item[treeKey])"
                ></i>
              </div>
            </template>
            <template v-else-if="!multiple">
              {{ selectObj[labelKey] }}
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
  data() {
    return {
      checkNode: [],
      selectNode: '',
      checkList: [],
      selectObj: {},
      popoverWidth: ''
    };
  },
  props: {
    value: {
      type: [Array, String, Number],
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
    treeKey: {
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
        this.checkNode = this.checkList.map((i) => i[this.treeKey]);
      } else {
        this.checkList = this.$refs.tree?.getCheckedNodes();
        this.checkNode = this.checkList.map((i) => i[this.treeKey]);
      }
      this.$emit('input', this.checkNode);
      this.$emit('change', this.checkList);
    },
    handleClickChange() {
      if (this.multiple) return;
      this.selectNode = this.$refs.tree.getCurrentKey();
      this.selectObj = this.$refs.tree.getCurrentNode();
      this.$emit('input', this.selectNode);
      this.$emit('change', this.selectObj);
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
  },
  mounted() {
    this.handleUpdateValue();
    this.popoverWidth = this.$refs['select-tree'].clientWidth;
  }
};
</script>
<style lang="less" scoped>
.select-tree {
  .el-input__inner {
    height: inherit;
  }
  .el-input {
    cursor: pointer;
  }
  .placeholder {
    font-size: 14/16rem;
    color: #999;
  }
  .tag + .tag {
    margin-left: 10/16rem;
  }
}
</style>