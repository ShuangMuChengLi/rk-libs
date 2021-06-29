# h5s播放弹窗
## preview
[预览](./index.html#/demo/h5s-player-dialog-demo)
## download
[组件下载](./components/h5s-player-dialog.zip)
## dependence
Vue.js\ElementUI环境、moment、lodash、axios

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| liveVideoVisible | 弹窗是否显示 | Boolean | - | false  | 
| channelCode | 通道号 | String | - | null  | 
| channelName | 视频名称 | String | - | null  | 
| serverInfo | 服务器信息 | Object | - | null  | 
### serverInfo
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| serverHost | 视频服务地址(IP:Port) | Boolean | - | null  | 
| account | 账号 | String | - | null  | 
| password | 密码 | String | - | null  | 
## usage
```
<template>
  <div class="live-video-wrapper-test">
    <h5s-player-dialog
      :visible.sync="liveVideoVisible"
      :channel-code="channelCode"
      :channel-name="channelName"
      :server-info="serverInfo"
    />
  </div>
</template>

<script>
import H5sPlayerDialog from '@/components/h5s-player-dialog/h5s-player-dialog';
export default {
  name: 'H5sPlayerDialogDemo',
  components: { H5sPlayerDialog },
  data(){
    return{
      liveVideoVisible: true,
      channelCode: '50011602001310010263',
      channelName: '16020153东城相府与鞍子街路口1',
      serverInfo: {
        'serverHost': '50.72.110.37:8080',
        'account': 'admin',
        'password': '12345'
      }
    };
  },
};
</script>

```
