# video.js实现hlv播放组件
## preview
[预览](./index.html#/components/video-js-hls)
## download
[组件下载](./components/video-js-hls.zip)
## dependence
Vue.js、video.js

## Attributes
| 参数 |	说明 |类型 |可选值	| 是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | ----  | 
| video-src | hlv视频流地址 | String | - | true  | -  |
## usage
```javascript
import 'video.js/dist/video-js.css';
```
```Vue
<template>
  <video-js-hls video-src="http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8" />
</template>

<script>
import VideoJsHls from './video-js-hls';
export default {
  name: 'VideoJsHlsDemo',
  components: {VideoJsHls}
};
</script>
```
