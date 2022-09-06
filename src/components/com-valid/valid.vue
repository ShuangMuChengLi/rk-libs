<template>
  <div>
    <div>
      基础示例, 类型为IP时,自适应禁用字段,并根据IP规则进行校验
    </div>
    <com-valid
      :val="normal"
      :tyep="1"
      mark="IP地址"
      @vaild="normalVaildFun"
    />
    <div>
      类型为自定义时, 禁用所有特殊字符、字母和数字,对空值进行校验
    </div>
    <com-valid
      :val="custom"
      :tyep="0"
      :list="['symbol', 'letter', 'number']"
      mark="实有地址"
      @vaild="customVaildFun"
    />
  </div>
</template>

<script>
export default {
  name: 'Test',
  components: {
    ComValid: () => import('./com-valid.vue')
  },
  data() {
    return {
      normal: '',
      custom: ''
    };
  },
  methods: {
    normalVaildFun(val) {
      if(val) {
        this.$message.success('校验成功');
      }
    },
    customVaildFun(val) {
      if(val) {
        this.$message.success('校验成功');
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