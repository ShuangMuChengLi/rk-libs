<template>
  <common-dialog
    v-model="dialogVisible"
    :header="'金桥市场东门卡口抓拍'"
    width="675px"
    height="300px"
  >
    <div class="dialog-body">
      <el-image
        class="img"
        src="https://picsum.photos/655/240"
        fit="contain"
      />
    </div>
  </common-dialog>
</template>

<script>
import CommonDialog from './common-dialog';
export default {
  name: 'CommonDialogDemo',
  components: {CommonDialog},
  data(){
    return {
      dialogVisible: true
    };
  }
};
</script>

<style scoped lang="less">
.dialog-body{
  flex: auto;
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
  .img{
    width: 100%;
    height: 100%;
  }
}
</style>
