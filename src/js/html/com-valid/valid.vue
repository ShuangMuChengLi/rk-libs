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