# 花瓣网的超高清图片浏览弹窗  
全屏展示图片。点击图片某个点，1:1原尺寸展示图片，并可以拖动展示图片的细节。
## preview
[预览](./index.html#/demo/zoom-picture-viewer-demo)
## download
[组件下载](./components/zoom-picture-viewer.zip)
## dependence
Vue.js
## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 | 必填 |
| ---- | ---- |---- | ----   |----  | ---- |
| v-model | 是否显示 | Boolean | - | false  | true |
| src | 图片地址 | String | - | null  | true |
## usage
```
<template>
  <div>
    <el-button
      type="primary"
      @click="show"
    >
      显示
    </el-button>
    <zoom-picture-viewer
      v-model="visible"
      :src="pic"
    />
  </div>
</template>

<script>
import ZoomPictureViewer from '@/components/zoom-picture-viewer/zoom-picture-viewer';
import imgURL from '../../../public/2.jpg';

export default {
  name: 'ZoomPictureViewerDemo',
  components: { ZoomPictureViewer },
  data(){
    return {
      visible: false,
      pic: null
    };
  },
  methods: {
    show(){
      this.pic = imgURL;
      this.visible = true;
    }
  }
};
</script>


```
