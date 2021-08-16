# 箭头
## preview
[预览](./index.html#/demo/arrow-demo)
## download
[组件下载](./components/flow-chart/arrow.zip)
## dependence
Vue.js\ElementUI环境、moment、lodash、axios

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| width | 宽度 | Number | - | 500  | 
| height | 通道号 | Number | - | 500  | 
| path | xy点位集合的二维数组 | Array | - | null  | 
| color | 线条颜色 | String | - | '#000'  | 
## usage
```
<template>
  <arrow
    class="arrow arrow4"
    :width="254"
    :height="110"
    :path="path"
    color="#000"
  />
</template>

<script>
import Arrow from '@/components/flow-chart/arrow/arrow';
export default {
  name: 'ArrowDemo',
  components: { Arrow },
  data(){
    return {
      path: [
        [254 / 4, 0],
        [254 / 4, 110 / 2],
        [254, 110 / 2]
      ],
    };
  }
};
</script>
```
