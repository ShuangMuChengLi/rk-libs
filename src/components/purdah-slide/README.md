# 帷幕效果的幻灯片
## preview
网络慢，建议本地运行  
[预览](./index.html#/demo/purdah-slide)
## download
[组件下载](./components/purdah-slide.zip)
## dependence
Vue.js环境

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| data | 图片地址列表 | Array<String> | - | -  | 
## usage
```
<template>
  <div class="wrapper">
    <purdah-slide :data="data" />
  </div>
</template>

<script>
import PurdahSlide from '@/components/purdah-slide/purdah-slide';
import imgSrc1 from '../../images/1.jpg';
import imgSrc2 from '../../images/2.jpg';
import imgSrc3 from '../../images/3.jpg';
import imgSrc4 from '../../images/4.jpg';
import imgSrc5 from '../../images/5.jpg';
export default {
  name: 'VueTest',
  components: { PurdahSlide },
  data(){
    return {
      data: [
        imgSrc1,
        imgSrc2,
        imgSrc3,
        imgSrc4,
        imgSrc5,
      ]
    };
  },
};
</script>

<style scoped>
  .wrapper{
    width: 500px;
    height: 500px;
  }
</style>
```
