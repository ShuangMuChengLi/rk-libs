# 鸟瞰图
  网页鸟瞰
  按住图标移动
  按住鸟瞰移动(红色框区域)
## contributor
纪爱妹
## preview
[预览](./index.html#/components/rk-aerial-view/rk-aerial-view-demo)
## download
[组件下载](./components/rk-aerial-view.zip)
## dependence
html2canvas

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| width | 鸟瞰图最大宽度 | Number | - | 200  | 
| height | 鸟瞰图最大高度 | Number | - | 200  | 
## usage
```
<template>
  <div
    ref="aerialRef"
    class="rk-aerial-view"
  >
    <div
      ref="mainRef"
      class="main"
      :style="mainStyle"
      @mousedown.stop="mainMouseDown"
    >
      <slot />
      <div
        v-show="isMask"
        class="mask"
      />
    </div>
    <div class="view">
      <img
        ref="imgRef"
        :src="imgUrl"
        :style="imgStyle"
      />
      <div
        class="pos"
        :style="posStyle"
        @mousedown.stop="posMouseDown"
      />
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import { on, off } from './event';
export default {
  name: 'RkAerialView',
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      imgUrl: '',
      zoom: {
        x: 0,
        y: 0
      },
      viewInfo: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      isMask: false,
      scale: 1
    };
  },
  computed: {
    mainStyle() {
      return {
        left: this.viewInfo.left + 'px',
        top: this.viewInfo.top + 'px'
      };
    },
    imgStyle() {
      return {
        'max-width': this.width + 'px',
        'max-height': this.height + 'px'
      };
    },
    posStyle() {
      let w = this.viewInfo.width * this.zoom.x || 0;
      let h = this.viewInfo.height * this.zoom.y || 0;
      let left = (-this.viewInfo.left) * this.zoom.x || 0;
      let top = (-this.viewInfo.top) * this.zoom.y || 0;
      return {
        width: w + 'px',
        height: h + 'px',
        left: left + 'px',
        top: top + 'px'
      };
    }
  },
  beforeDestroy() {
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.toImageFun();
    });
  },
  methods: {
    init() {
      let { width, height } = this.$refs.aerialRef.getBoundingClientRect();
      this.viewInfo.width = width;
      this.viewInfo.height = height;
    },
    // 网页转为图片
    toImageFun() {
      let { width, height } = this.$refs.mainRef.getBoundingClientRect();
      let cv = document.createElement('canvas');
      let ctx = cv.getContext('2d');
      cv.width = width;
      cv.height = height;
      html2canvas(this.$refs.mainRef, {
        'useCORS': true
      }).then(canvas => {
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        this.imgUrl = cv.toDataURL('image/jpeg');
        this.posInit();
      });
    },
    posInit() {
      this.$refs.imgRef.onload = () => {
        this.zoom.x = this.$refs.imgRef.width / this.$refs.imgRef.naturalWidth;
        this.zoom.y = this.$refs.imgRef.height / this.$refs.imgRef.naturalHeight;
      };
    },
    mainMouseDown(e) {
      let { width, height} = this.$refs.aerialRef.getBoundingClientRect();

      let x = this.viewInfo.left;
      let y = this.viewInfo.top;
      let w = e.target.offsetWidth;
      let h = e.target.offsetHeight;

      let maxDisX = width - w;
      let maxDisY = height - h;

      let posX = e.clientX - x;
      let posY = e.clientY - y;

      let moveMain = (e) => {
        this.isMask = true;

        let disX = e.clientX - posX;
        let disY = e.clientY - posY;

        if(disX < maxDisX) disX = maxDisX;
        if(disY < maxDisY) disY = maxDisY;

        if(disX > 0) disX = 0;
        if(disY > 0) disY = 0;
        this.viewInfo.left = disX;
        this.viewInfo.top = disY;
      };
      let upMain = () => {
        off(document, 'mousemove', moveMain);
        off(document, 'mouseup', upMain);
        this.isMask = false;
      };

      on(document, 'mousemove', moveMain);
      on(document, 'mouseup', upMain);
    },
    posMouseDown(e) {
      e.stopPropagation();
      let { width, height} = this.$refs.imgRef.getBoundingClientRect();

      let {left, top} = this.viewInfo;
      let x = -left * this.zoom.x || 0;
      let y = -top * this.zoom.y || 0;
      let w = e.target.offsetWidth;
      let h = e.target.offsetHeight;

      let maxDisX = width - w;
      let maxDisY = height - h;

      let posX = e.clientX - x;
      let posY = e.clientY - y;

      let movePos = (e) => {
        let disX = e.clientX - posX;
        let disY = e.clientY - posY;

        if(disX > maxDisX) disX = maxDisX;
        if(disY > maxDisY) disY = maxDisY;

        if(disX < 0) disX = 0;
        if(disY < 0) disY = 0;

        this.viewInfo.left = -disX / this.zoom.x;
        this.viewInfo.top = -disY / this.zoom.y;
      };
      let upPos = () => {
        off(document, 'mousemove', movePos);
        off(document, 'mouseup', upPos);
      };

      on(document, 'mousemove', movePos);
      on(document, 'mouseup', upPos);
    }
  }
};
</script>

<style scoped lang="less">
  .rk-aerial-view {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .main {
      position: absolute;

      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
      }
    }

    .view {
      position: absolute;
      bottom: 5px;
      right: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      .pos {
        position: absolute;
        border: 1px solid red;
      }
    }
  }
</style>

```
