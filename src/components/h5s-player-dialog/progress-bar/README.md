# 视频控件的时间轴选择器
## preview
[预览](./index.html#/demo/Progress-bar-demo)
## download
[组件下载](./components/progress-bar.zip)
## dependence
Vue.js环境、moment

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| current | 时间轴的当前时间 | Date | - | new Date()  | 
## Events
| 事件名称 |	说明 |回调参数 |
| ---- | ---- |---- | 
| playBack | 点击开始播放按钮的回调 | Array [开始时间, 结束时间] | 
| exit | 点击退出按钮的回调 | null | 
## usage
```
<template>
  <div class="home">
    <progress-bar
      :current="progressBarDate"
      @playBack="playBack"
      @exit="progressBarExit"
    />
  </div>
</template>

<script>

import ProgressBar from '@/components/progress-bar/progress-bar';
export default {
  name: 'ProgressBarDemo',
  components: {
    ProgressBar
  },
  data(){
    return {
      progressBarDate: new Date()
    };
  },
  methods:{
    playBack(start, end){
      console.log('播放按钮触发', start, end);
    },
    progressBarExit(){
      console.log('退出按钮触发');
    }
  }
};
</script>

```
