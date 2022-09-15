# 视频第一帧图片
  视频图片展示
## preview
[预览](./index.html#/demo/video-first-frame-demo)
## download
[组件下载](./js/html/video-first-frame.zip)
## dependence
null

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| url | 视频路径 | String | - | -  | 
| w | 文件扩展名（文件后缀） | Number | - | 250  | 
| h | 是否可拖拽 | Number | - | 450  | 
### callback
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| url | 返回base64路径 | String | - | ''  | 
## usage
```
function getVideoFirstFrame(url, w = 250, h = 450) {
  return new Promise((resolve, reject) => {
    let video = document.createElement('video');
    video.autoplay = 'autoplay'; // 自动播放
    video.muted = 'muted'; // 静音
    video.src = url;
    video.crossOrigin = 'anonymous'; // 可跨域

    let canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext('2d');

    // 注册自动播放事件
    video.addEventListener('canplay', function() {
      ctx.drawImage(video, 0, 0, w, h);
      let base64 = canvas.toDataURL('image/jpeg');
      video.pause();
      resolve(base64);
      video.remove();
      canvas.remove();
    });
  });
}
```
