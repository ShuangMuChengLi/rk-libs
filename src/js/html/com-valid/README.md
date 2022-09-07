# 表单校验、限制输入
适用于对表单进行限制输入、校验
## preview
[预览](./index.html#/demo/valid)
## download
[组件下载](./js/html/com-valid.zip)
## dependence
Vue.js\ElementUI环境

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| list | 自定义限制输入列表,每添加一个字符串代表限制相应的输入 | Array | symbol-特殊字符 letter-字母 number-数字 chinese-中文 | []  | 
| item | 预设的限制方式 | String | ip-IP地址 phone-电话号码 idCard-身份证号 | ''  | 
| val | 需要限制的值 | String | - | ''  | 
## return
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| val | 限制之后的值 | String | - | ''  | 
## usage
```
<template>
  <template>
  <div>
    <el-form 
      ref="ruleForm"
      class="form"
      label-width="120px"
      label-position="right"
      :model="ruleForm"
      :rules="rules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="IP"
            prop="ip"
          >
            <el-input
              v-model="ruleForm.ip"
              placeholder="基础示例,限制符合ip规范的字符输入,校验IP"
              @input="ruleForm.ip = replaceNormalFun('ip', ruleForm.ip)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="设备名称"
            prop="deviceName"
          >
            <el-input
              v-model="ruleForm.deviceName"
              placeholder="自定义限制字段,限制特殊字符、字母、数字输入"
              @input="ruleForm.deviceName = replaceCustomFun(['symbol', 'letter', 'number'], ruleForm.deviceName)"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {replaceNormalFun, replaceCustomFun, checkIp} from './vaild';
export default {
  name: 'Valid',
  data() {
    return {
      ruleForm: {
        ip: '',
        deviceName: ''
      },
      rules: {
        ip: [
          { required: true, validator: checkIp, trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // methods中注册方法
    replaceNormalFun, 
    replaceCustomFun,
    checkIp
  }
};
</script>

<style scoped lang="less">
  /deep/ .el-input {
    width: 400px;
  }
</style>

```
