# 签名板组件
## contributor
沈鑫龙
## preview
[预览](./index.html#/components/com-signWrite/signWrite)
## download
[组件下载](./components/com-signWrite.zip)
## dependence
Vue.js ie8以上浏览器

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| show | 弹窗是否显示 | Boolean | - | false  | 
| isRem | 是否使用rem | Boolean | - | false  | 
## usage
```
<template>
  <div>
    <div>
      <el-button @click="writeShow = true">
        打开签名板
      </el-button>
      <!-- 引入签名组件 -->
      <Write
        :show.sync="writeShow"
      />
    </div>
  </div>
</template>
<script>
import Write from './com-signWrite.vue';

export default {
  name: '',
  components: {
    Write
  },
  data() {
    return {
      writeShow: false
    };
  }
};
</script>

```
