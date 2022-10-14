# 图片验证码
点击图片和输入错误时更新验证码
## contributor
沈鑫龙
## preview
[预览](./index.html#/components/com-codeImg/codeImg)
## download
[组件下载](./components/com-codeImage.zip)
## dependence
Vue.js、ie9以上浏览器

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| changeCode | 该参数变化时更新验证码 | Number | - | 0  | 
| contentWidth | 画布宽度 | Number | - | 116  | 
| contentHeight | 画布高度 | Number | - | 38  | 
| fontSizeMin | 画布高度 | Number | - | 25  | 
| fontSizeMax | 画布高度 | Number | - | 35  | 
| backgroundColorMin | 画布高度 | Number | - | 200  | 
| backgroundColorMax | 画布高度 | Number | - | 220  | 
| dotColorMin | 画布高度 | Number | - | 60  | 
| dotColorMax | 画布高度 | Number | - | 120  |  
### callback
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| identify-code | 返回生成的验证码 | String | - | ''  | 
## usage
```
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

```
