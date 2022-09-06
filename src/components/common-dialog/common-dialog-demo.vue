<template>
  <common-dialog v-model="visible">
    共用弹窗
  </common-dialog>
</template>

<script>
import CommonDialog from './common-dialog';
export default {
  name: 'CommonDialogDemo',
  components: {CommonDialog},
  data(){
  	return {
		  visible: true
    };
  }
};
</script>

<style scoped>

</style>
