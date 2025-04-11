<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      title="错误数据"
      append-to-body
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <template #title>
        <div class="custom-dialog-title">
          <slot name="icon">
            <i class="el-icon-info" />
          </slot>{{ title }}
        </div>
      </template>

      <CusTable
        height="40vh"
        :list="list"
        :columns="[
          ...columns,
          {
            label: '错误信息',
            prop: 'remark',
            minWidth: '120px',
            showOverflowToolTip: true
          }
        ]"
      />
      <div slot="footer">
        <el-button @click="close">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handelConfirm"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CusTable from '../../../CusTable/CusTable.vue';

export default {
  components: { CusTable },
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default() {
        return [
          {
            label: '内容'
          }
        ];
      }
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      title: '错误数据'
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {},
    close() {
      this.$emit('update:visible', false);
    },
    handelConfirm() {
      this.close();
    }
  }
};
</script>
<style></style>
