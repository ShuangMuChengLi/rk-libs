# 相机抓拍工具类
## preview
[预览](./index.html#/demo/capture-pic)
## download
[库文件下载](./js/html/capture-pic.zip)
## install
```
npm install capture-pic
```
## Class
```
new CapturePic(options)
```
## options
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| options | 类的参数 | Object | false | -  | 

### options
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| videoId | 预览的video的id, 不填不进行预览 | String | false | -  | 

## methods
### init()
初始化
#### arg
null
#### return
CapturePic对象

### getBase64()
获取抓拍到图片Base64编码
#### arg
null
#### return
String 抓拍到图片Base64编码

### stop()
关闭摄像头，停止抓拍
#### arg
null
#### return
null

## usage
```
<template>
  <div>
    <div>
      <h2>直接抓拍</h2>
      <button
        @click="capture"
      >
        抓拍
      </button>
    </div>
    <div>
      <h2>video预览</h2>
      <button @click="preView">
        预览
      </button>
      <button
        @click="getBase64"
      >
        抓拍
      </button>
      <button @click="stop">
        停止
      </button>
    </div>
    <div>
      <video id="video" />
    </div>
    <div>
      <img
        id="img"
        :src="src"
      >
    </div>
  </div>
</template>

<script>
import { CapturePic } from 'capture-pic';
export default {
  name: 'CapturePicDemo',
  data(){
    return {
      capUtil: null,
      src: null
    };
  },
  methods:{
    async capture(){
      this.capUtil = await new CapturePic().init();
      this.getBase64();
      this.stop();
    },
    async preView(){
      this.capUtil = await new CapturePic({
        videoId:'video'
      }).init();
    },
    getBase64(){
      this.src = this.capUtil.capture().getBase64();
    },
    stop(){
      this.capUtil.stop();
      this.capUtil = null;
    }
  }
};
</script>
```
