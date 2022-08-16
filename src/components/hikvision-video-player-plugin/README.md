# 前端对接海康媒体平台视频播放插件的vue封装
## preview
[预览](./#/components/video-player-plugin)
## download
[组件下载](./components/hikvison-video-player-plugin.zip)
## dependence
jsencrypt

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| option | 播放器配置 | Object | false | -  |  { iWidth: 500,iHeight: 300 } |
| channelCode | 通道号 | String or Array | true | -  |  - |
## usage
在使用视频播放器之前，需要安装[VideoWebPlugin.exe](https://open.hikvision.com/fileserver/filesonline/%E8%A7%86%E9%A2%91WEB%E6%8F%92%E4%BB%B6_Win32_V1.5.2_build202109161510_20210916161718.rar)插件。(如当前链接无法下载，请在[参考文档及SDK](#document-and-sdk)中下载)
```vue
<template>
  <div>
    <div class="one">
      <videoPlayerPlugin
        :channel-code="['9db7e551c0394289b7aa049be5d21111', 'a6d538087dda43ffbb51d5217f481111', 'a92d6d04e13a41e69898567c95a31111', 'b635283246c94e00af0f8775dc371111']"
      />
    </div>
    <div class="two">
      <videoPlayerPlugin
        :channel-code="'9db7e551c0394289b7aa049be5d21111'"
        :option="option"
      />
    </div>
  </div>
</template>
<script>
import videoPlayerPlugin from '@/components/video-player/video-player-plugin';
export default {
  components: {
    videoPlayerPlugin
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
[海康官方文档及SDK下载](https://open.hikvision.com/fileserver/filesonline/%E8%A7%86%E9%A2%91WEB%E6%8F%92%E4%BB%B6_Win32_V1.5.2_build202109161510_20210916161718.rar)