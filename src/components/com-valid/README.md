# 校验输入框
适用于对输入框进行限制输入、表单校验
## preview
[预览](./index.html#/components/com-valid/valid)
## download
[组件下载](./components/com-valid.zip)
## dependence
Vue.js\ElementUI环境

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| val | input绑定的值 | String | - | ''  | 
| tyep | 校验类型 | Number | 0-自定义 1-IP地址 2-电话号码 3-身份证号 | 0  | 
| list | 当校验类型为自定义时，限制输入列表,每添加一个字符串代表限制相应的输入 | Array | symbol-特殊字符 letter-字母 number-数字 chinese-中文 | ['symbol']  | 
| mark | 字段名,同时也是提示词 | String | - | 参数  | 
## callback
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| vaild | 校验是否通过,校验通过返回true,不通过无返回 | Boolean | - | ''  | 
## usage
```
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

```
