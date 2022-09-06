<template>
  <div class="code-image-box">
    <div>
      <el-input
        v-model="code"
        placeholder="请填写验证码"
      />
    </div>
    <!-- 引入验证码组件 -->
    <div>
      <identify 
        :change-code="changeCode"
        @identify-code="identifyCode" 
      />
    </div>
    <el-button
      @click="handleSubmit"
    >
      确认
    </el-button>
  </div>
</template>
<script>
import identify from './com-codeImg.vue';

export default {
  name: '',
  components: {
    identify
  },
  data() {
    return {
      code: '',
      imgCode: '',
      changeCode: 0
    };
  },
  methods: {
    // 获取生成的随机验证码
    identifyCode(val) {
      this.imgCode = val;
    },
    //  下一步按钮 拿到code值跟随机生成的验证码进行对比
    handleSubmit() {
      if (this.imgCode !== this.code ) {
        this.$message.error('验证失败');
        this.changeCode ++;// 改变验证码
      } else {
        this.$message.success('验证成功');
      }
    }
  }
};
</script>
 
<style scoped lang="less">
  /deep/ .el-input {
    width: 200px;
  }
</style>