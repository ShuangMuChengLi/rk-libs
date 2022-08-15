<template>
  <div
    ref="graphicItem"
    class="graphic-item"
    :style="{
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <div
      ref="imgBox"
      class="img-box"
    >
      <img
        ref="imgSmall"
        :src="src"
        class="active"
        @mousemove="moveFun"
        @mouseenter="enterFun"
        @mouseleave="leaveFun"
      >
    </div>
    <!--放大镜-->
    <div
      v-show="isMagnifier"
      ref="magnifierRef"
      class="magnifier-box"
      :style="{
        'left': posMagnifier.left + 'px',
        'top': posMagnifier.top + 'px',
        width: width + 'px',
        height: height + 'px',
      }"
    >
      <img
        ref="imgLarge"
        :src="src"
        :style="{'left': posImage.left + 'px', 'top': posImage.top + 'px'}"
      >
    </div>
  </div>
</template>

<script>

export default {
  name: 'Zoomer',
  props: {
    src: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
  },
  data() {
    return {
      // 放大镜
      isMagnifier: false,
      posMagnifierLoad: false,
      posMagnifier: {
        left: 0,
        top: 0
      },
      posImage: {
        left: 0,
        top: 0
      },
      posLicense: {
        width: 0,
        height:0,
        left: 0,
        top: 0
      },
    };
  },
  beforeDestroy() {
  },
  mounted() {
  },
  methods: {
    /**
     * 鼠标进入
     */
    enterFun(event) {
      this.isMagnifier = true;
      this.$nextTick(() => {
        // 放大镜位置
        this.posChange(event);
        this.posMagnifierLoad = true;
      });
    },
    /**
     * 鼠标移动
     */
    moveFun(event) {
      if(!this.posMagnifierLoad) return;

      // 小图(具体展示) 与大图的倍数
      let scale = this.$refs.imgLarge.offsetWidth / this.$refs.imgSmall.offsetWidth;
      // 放大镜 在 小图上的大小的一半
      let scaleX = this.$refs.magnifierRef.offsetWidth / scale / 2;
      let scaleY = this.$refs.magnifierRef.offsetHeight / scale / 2;

      let scaleLeft = event.offsetX - scaleX;
      if(scaleLeft < 0) scaleLeft = 0;
      if(event.offsetX + scaleX > this.$refs.imgSmall.offsetWidth) {
        scaleLeft = this.$refs.imgSmall.offsetWidth - 2 * scaleX;
      }

      let scaleTop = event.offsetY - scaleY;
      if(scaleTop < 0) scaleTop = 0;
      if(event.offsetY + scaleY > this.$refs.imgSmall.offsetHeight) {
        scaleTop = this.$refs.imgSmall.offsetHeight - 2 * scaleY;
      }

      this.posImage.left = - scaleLeft * scale;
      this.posImage.top = - scaleTop * scale;
    },
    /**
     * 鼠标离开
     */
    leaveFun() {
      this.isMagnifier = false;
      this.posMagnifierLoad = false;
    },
    /**
     * 放大镜位置
     */
    posChange(event){
      let imgClientX = event.clientX - event.offsetX; // 图片与浏览器 left距离
      let imgBoxX = this.$refs.imgSmall.offsetLeft; // 图片与div.img-box left距离
      let boxItemX = this.$refs.imgBox.offsetLeft; // div.img-box与div.graphic-item left距离
      let itemClientX = imgClientX - imgBoxX - boxItemX; // div.graphic-item与浏览器 left距离
      let itemW = this.$refs.graphicItem.offsetWidth; // div.graphic-item 宽(包含border padding margin)
      let magnifierW = this.$refs.magnifierRef.offsetWidth; // div.magnifier-box

      if(itemClientX + itemW + magnifierW > document.body.offsetWidth) {
        this.posMagnifier.left = - magnifierW - 10;
      }else{
        this.posMagnifier.left = itemW + 10;
      }

      let imgClientY = event.clientY - event.offsetY; // 图片与浏览器 top距离
      let imgBoxY = this.$refs.imgSmall.offsetTop; // 图片与div.img-box top距离
      let boxItemY = this.$refs.imgBox.offsetTop; // div.img-box与div.graphic-item top距离
      let itemClientY = imgClientY - imgBoxY - boxItemY; // div.graphic-item与浏览器 top距离
      let itemH = this.$refs.graphicItem.offsetHeight; // div.graphic-item 宽(包含border padding margin)
      let magnifierH = this.$refs.magnifierRef.offsetHeight; // div.magnifier-box

      if(itemClientY + magnifierH > document.body.offsetHeight) {
        this.posMagnifier.top = - (magnifierH - itemH);
      }else{
        this.posMagnifier.top = 0;
      }
    },
  }
};
</script>

<style scoped lang="less">
.graphic-item {
  font-size: 14px;
  cursor: pointer;
  position: relative;
  &:hover{
    border-color: #325cb2;
  }
}
.img-box{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img{
    max-width:100%;
    max-height:100%;
    pointer-events: none;
    &.active{
      pointer-events: auto;
    }
  }
  .pos{
    border: 1px solid red;
    position: absolute;
    z-index: 0;
    pointer-events: none;
  }
}
.magnifier-box{
  overflow: hidden;
  position: fixed;
  /*background: #37415e;*/
  z-index: 99999;
  img{
    position: absolute;
  }
}
</style>
