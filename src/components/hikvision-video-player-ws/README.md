# 前端对接海康媒体平台websocket的vue封装
## preview
无
## download
[组件下载](./components/hikvision-video-player-ws.zip)
## dependence
rk-axios

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| option | 播放器配置 | Object | false | -  |  { iWidth: 500,iHeight: 300 } |
| channelCode | 通道号 | String or Array\<String\> | true | -  |  - |
## usage
```html
 <script src="/h5player/plugin/jsWebControl-1.0.0.min.js"></script>
```
需要通过后端获取实际的播放地址
```vue
<template>
  <div>
    <div class="one">
      <videoPlayerWs
        :channel-code="['9db7e551c0394289b7aa049be5d21111', 'a6d538087dda43ffbb51d5217f481111', 'a92d6d04e13a41e69898567c95a31111', 'b635283246c94e00af0f8775dc371111']"
      />
    </div>
    <div class="two">
      <videoPlayerWs
        :channel-code="'9db7e551c0394289b7aa049be5d21111'"
        :option="option"
      />
    </div>
  </div>
</template>
<script>
import videoPlayerWs from '@/components/video-player/video-player-ws';
export default {
  components: {
    videoPlayerWs
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
## <span id="document-and-sdk">参考文档及SDK</span>
[海康综合安防管理平台-H5视频播放器开发包 V2.1.2](https://open.hikvision.com/download/5c67f1e2f05948198c909700?type=10)
