# 拖拽下拉框组件
## preview
[预览](./index.html#/components/select-drag/select-drag-demo)
## download
[组件下载](./components/select-drag/select-drag-demo.zip)
## dependence
Vue.js ie8以上浏览器

## Attributes
| 参数 |	说明 |类型 | 是否必填 |可选值	| 默认值 |
| ---- | ---- |---- | ---- | ----  |----  | 
| value | 绑定值 | Array | 是 | - |  [] |
## usage
```
<template>
  <el-select
    ref="selectDrag"
    v-model="selectVal"
    v-bind="$attrs"
    class="select-drag"
    multiple
    v-on="$listeners"
  >
    <slot />
  </el-select>
</template>

<script>
import Sortable from 'sortablejs';

export default {
  name: 'SelectDrag',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    selectVal: {
      get() {
        return [...this.value];
      },
      set(val) {
        this.$emit('input', [...val]);
      }
    }
  },
  mounted() {
    this.setSort();
  },
  methods: {
    setSort() {
      const el = this.$refs.selectDrag.$el.querySelectorAll(
        '.el-select__tags > span'
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '');
        },
        onEnd: evt => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0];
          this.value.splice(evt.newIndex, 0, targetRow);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.select-drag {
  ::v-deep {
    .sortable-ghost {
      opacity: 0.8;
      color: #fff !important;
      background: #42b983 !important;
    }

    .el-tag {
      cursor: pointer;
    }
  }
}
</style>


```
