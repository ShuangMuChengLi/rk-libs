# 音频时长
  计算音频时长
## contributor
纪爱妹
## preview
[预览](./index.html#/demo/audio-duration-demo)
## download
[组件下载](./js/html/audio-duration.zip)
## dependence
null

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| url | 音频路径 | String | - | -  | 
### callback
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| time | 音频时长(秒) | Number | - | ''  | 
## usage
```
export function getAudioDuration(url) {
  return new Promise((resolve, reject) => {
    // js
    let audio = new Audio(); // document.createElement('audio');
    audio.src = url;
    audio.addEventListener('canplay', () => {
      if(audio.duration && audio.duration !== Infinity){
        resolve(Math.floor(audio.duration));
      }
      audio.remove();
    });
  });
}
```
