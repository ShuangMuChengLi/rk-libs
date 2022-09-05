<template>
  <div>
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>
    <el-dialog :visible.sync="dialog" title="弹窗" width="400px" v-dialog-drag>
      <div>
        <div>1、鼠标移到头部，点击拖拽</div>
        <div>2、鼠标移到边框，点击拖拽改变弹窗大小</div>
      </div>
      <span slot="footer">
        <el-button size="small" @click="dialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import './dragZoom';
export default {
  name: 'DialogDrag',
  data() {
    return {
      dialog: true
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    openDialog(){
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
