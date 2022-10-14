# 前端对接海康媒体平台使用hls方式的vue封装
## contributor
肖广
## preview
无
## download
[组件下载](./components/hikvision-video-player-hls.zip)
## dependence
video.js  rk-axios
## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| option | 播放器配置 | Object | false | -  |  { iWidth: 500,iHeight: 300 } |
| channelCode | 通道号 | String or Array\<String\> | true | -  |  - |
## usage
```vue
<template>
  <div>
    <div class="one">
      <videoPlayerHls
        :channel-code="['9db7e551c0394289b7aa049be5d21111', 'a6d538087dda43ffbb51d5217f481111', 'a92d6d04e13a41e69898567c95a31111', 'b635283246c94e00af0f8775dc371111']"
      />
    </div>
    <div class="two">
      <videoPlayerHls
        :channel-code="'9db7e551c0394289b7aa049be5d21111'"
        :option="option"
      />
    </div>
  </div>
</template>
<script>
import videoPlayerHls from '@/components/video-player/video-player-hls';
export default {
  components: {
    videoPlayerHls
  },
  props: {
  },
  data() {
    return {
      option: {
        iWidth: 400, // 播放器宽度
        iHeight: 250 // 播放器高度
      }
    };
  },
  methods: {
      
  }
};
</script>
<style lang="less" scoped>
.one {
  position: fixed;
  top: 0px;
  left: 0px;
}
.two {
  position: fixed;
  top: 350px;
  left: 0;
}
</style>
```
## 参考文档
[video.js](https://videojs.com/getting-started/)
