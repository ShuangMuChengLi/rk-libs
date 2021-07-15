<template>
  <picture-verify
    :width="400"
    :height="280"
    @success="success"
    @fail="fail"
  />
</template>

<script>
import PictureVerify from '@/components/picture-verify/picture-verify';
export default {
  name: 'PictureVerifyDemo',
  components: { PictureVerify },
  methods:{
    success(){
      this.$message.success('验证成功');
    },
    fail(){
      this.$message.error('验证失败');
    }
  }
};
</script>
