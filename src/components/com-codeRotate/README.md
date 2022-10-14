# 旋转图片验证码
## contributor
沈鑫龙
## preview
[预览](./index.html#/components/com-codeRotate/codeRotate)
## download
[组件下载](./components/com-codeRotate.zip)
## dependence
Vue.js\ElementUI环境

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| show | 弹窗是否显示 | Boolean | - | false  | 
## usage
```
<template>
  <div>
    <button @click="show = true">
      登录
    </button>
    <!-- 引入验证码组件 -->
    <div>
      <identify
        :show.sync="show"
      />
    </div>
  </div>
</template>
<script>
import identify from './com-codeRotate.vue';

export default {
  name: '',
  components: {
    identify
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
  }
};
</script>
 

```
