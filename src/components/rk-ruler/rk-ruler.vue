<!--
  标尺
  参考线：拖动鼠标
  移动：空格键 + 鼠标移动
  缩放：空格键 + 鼠标滚动  步长为0.01
-->
<template>
  <div
    ref="rulerRef"
    class="rk-ruler-wrapper"
  >
    <div
      class="rk-ruler-body"
      :style="bodyStyle"
      @mousedown.stop="bodyMouseDown"
      @mousewheel.stop="bodyMouseWheel"
    >
      <canvas
        id="rulerCanvas"
        class="ruler-canvas"
        :style="{'background-color': bgColor}"
        @mousedown.stop="canvasMouseDown"
      />
      <div
        class="ruler-content"
        :style="contentStyle"
      >
        <slot />
      </div>
      <!--虚线-->
      <div
        v-show="!!dotLine.dir"
        class="ruler-dot-line"
        :class="'ruler-dot-line-' + dotLine.dir"
        :style="dotLineStyle"
      />
      <!--参考线 实线-->
      <div
        v-for="(item, index) in solLine"
        :key="'solLine' + index"
        class="ruler-sol-line"
        :class="'ruler-sol-line-' + item.dir"
        :style="solLineStyle(item)"
        @mousedown.stop="solLineMouseDown(index)"
      />
      <!--mask-->
      <div
        v-show="!!wholeMoveOpe"
        class="ruler-mask"
      />
    </div>
  </div>
</template>

<script>
import { on, off } from './event.js';
export default {
  name: 'RkRuler',
  props: {
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 1080
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: '#000'
    },
    // 刻度线、文字颜色
    color: {
      type: String,
      default: '#999'
    }
  },
  data() {
    return {
      wholeMoveOpe: '',
      // 标尺 与 窗口的 x / y 距离
      rulerPos: {},
      isSpace: false,
      bodyPos: {
        left: 0,
        top: 0
      },

      gridPadding: 20,
      gridGap: 100,
      curZoom: 1, // 缩放倍数 (0, 1]
      dotLine: {
        dir: '', // 方向 x y
        x: 0,
        y: 0
      },
      curSolIndex: '',
      solLine: [] // 实线
    };
  },
  computed: {
    curPixel() {
      return (pixel) => {
        return pixel * this.curZoom;
      };
    },
    linePosZoom() {
      return (pixel) => {
        return this.curPixel(pixel - this.gridPadding) + this.gridPadding;
      };
    },
    linePosOriginal() {
      return (pixel) => {
        return (pixel - this.gridPadding) / this.curZoom + this.gridPadding;
      };
    },
    bodyStyle() {
      return {
        padding: `${this.gridPadding}px 0 0 ${this.gridPadding}px`,
        left: this.bodyPos.left + 'px',
        top: this.bodyPos.top + 'px'
      };
    },
    contentStyle() {
      return {
        width: this.curPixel(this.width) + 'px',
        height: this.curPixel(this.height) + 'px'
      };
    },
    dotLineStyle() {
      let obj = {};
      if(this.dotLine.dir === 'x') {
        obj = {
          left: 0,
          top: this.dotLine.y + 'px'
        };
      }else if(this.dotLine.dir === 'y') {
        obj = {
          left: this.dotLine.x + 'px',
          top: 0
        };
      }
      return obj;
    },
    solLineStyle() {
      return (item) => {
        let obj = {};
        if(item.dir === 'x') {
          obj = {
            left: 0,
            top: this.linePosZoom(item.y) + 'px'
          };
        }else if(item.dir === 'y') {
          obj = {
            left: this.linePosZoom(item.x) + 'px',
            top: 0
          };
        }
        return obj;
      };
    }
  },
  beforeDestroy() {
    off(document, 'mousemove', this.wholeMouseMoveFun);
    off(document, 'mouseup', this.wholeMouseUpFun);
    off(document, 'keydown', this.wholeKeyDownFun);
    off(document, 'keyup', this.wholeKeyUpFun);
  },
  mounted() {
    on(document, 'mousemove', this.wholeMouseMoveFun);
    on(document, 'mouseup', this.wholeMouseUpFun);
    on(document, 'keydown', this.wholeKeyDownFun);
    on(document, 'keyup', this.wholeKeyUpFun);
    this.init();
  },
  methods: {
    // document 鼠标移动
    wholeMouseMoveFun(e) {
      switch(this.wholeMoveOpe) {
      case 'canvas':case 'line':
        let { x, y} = this.$refs.rulerRef.getBoundingClientRect();
        this.dotLine.x = e.clientX - x;
        this.dotLine.y = e.clientY - y;
        break;
      }
    },
    wholeMouseUpFun() {
      switch(this.wholeMoveOpe) {
      case 'canvas':
        let bool1 = true;
        if(this.dotLine.dir === 'x' && this.dotLine.y < this.gridPadding) bool1 = false;
        if(this.dotLine.dir === 'y' && this.dotLine.x < this.gridPadding) bool1 = false;
        if(bool1) {
          this.solLine.push({
            dir: this.dotLine.dir,
            x: this.linePosOriginal(this.dotLine.x),
            y: this.linePosOriginal(this.dotLine.y)
          });
        }
        this.dotLine.dir = '';
        break;
      case 'line':
        let bool2 = true;
        if(this.dotLine.dir === 'x' && this.dotLine.y < this.gridPadding) bool2 = false;
        if(this.dotLine.dir === 'y' && this.dotLine.x < this.gridPadding) bool2 = false;

        if(bool2) {
          this.solLine[this.curSolIndex].x = this.linePosOriginal(this.dotLine.x);
          this.solLine[this.curSolIndex].y = this.linePosOriginal(this.dotLine.y);
        }else {
          this.solLine.splice(this.curSolIndex, 1);
        }
        this.dotLine.dir = '';
        break;
      }
      this.wholeMoveOpe = '';
    },
    wholeKeyDownFun(e) {
      if(e.keyCode === 32) {
        this.isSpace = true;
        this.wholeMoveOpe = 'body';
      }
    },
    wholeKeyUpFun(e) {
      if(e.keyCode === 32) {
        this.isSpace = false;
        this.wholeMoveOpe = '';
      }
    },
    init() {
      let canvas = document.getElementById('rulerCanvas');
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除

      canvas.width = this.curPixel(this.width) + this.gridPadding;
      canvas.height = this.curPixel(this.height) + this.gridPadding;

      ctx.lineWidth = 1;
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;

      this.drawHorizontalAxis(canvas, ctx);
      this.drawVerticalAxis(canvas, ctx);
    },
    // 绘制水平轴
    drawHorizontalAxis(canvas, ctx) {
      for (let i = 0; i < this.width; i = i + this.gridGap) {
        let scaleI = this.curPixel(i) + this.gridPadding;
        ctx.beginPath();
        ctx.moveTo(scaleI, this.gridPadding / 4);
        ctx.lineTo(scaleI, this.gridPadding);

        ctx.textAlign = 'left';
        ctx.fillText(i, scaleI + 2, this.gridPadding * 2 / 3 - 1);

        ctx.lineTo(scaleI + this.curPixel(this.gridGap), this.gridPadding);

        let curGap = this.curPixel(this.gridGap);
        let flag = 0;
        for (let j = scaleI + curGap / 10; j < scaleI + curGap; j = j + curGap / 10) {
          flag ++;
          ctx.moveTo(j, this.gridPadding);
          if (flag === 5) {
            ctx.lineTo(j, this.gridPadding / 2);
          } else {
            ctx.lineTo(j, this.gridPadding * 3 / 4);
          }
        }
        ctx.stroke();
      }
    },
    // 绘制垂直轴
    drawVerticalAxis(canvas, ctx) {
      for (let i = 0; i < this.height; i = i + this.gridGap) {
        let scaleI = this.curPixel(i) + this.gridPadding;
        ctx.beginPath();
        ctx.moveTo(this.gridPadding / 4, scaleI);
        ctx.lineTo(this.gridPadding, scaleI);

        let textH = 10; // 文字高 10px
        ctx.textAlign = 'right';
        let str = i + '';
        let arr = str.split('');
        let temp = 1;
        for(let item of arr) {
          ctx.fillText(item, this.gridPadding * 2 / 3 - 1, scaleI + temp * textH);
          temp ++;
        }

        ctx.lineTo(this.gridPadding, scaleI + this.curPixel(this.gridGap));

        let flag = 0;
        let curGap = this.curPixel(this.gridGap);
        for (let j = scaleI + curGap / 10; j < scaleI + curGap; j = j + curGap / 10) {
          flag ++;
          ctx.moveTo(this.gridPadding, j);
          if (flag === 5) {
            ctx.lineTo(this.gridPadding / 2, j);
          } else {
            ctx.lineTo(this.gridPadding * 3 / 4, j);
          }
        }
        ctx.stroke();
      }
    },
    mouseChangeZoom(val) {
      let num = this.curZoom + val;
      if(num > 1) num = 1;
      if(num <= 0) num = 0.01;
      this.changeZoomFun(num);
      this.$emit('zoomChange', num);
    },
    // 倍数改变重新绘制标尺
    changeZoomFun(zoom) {
      this.curZoom = zoom;
      this.init();
    },
    // body
    bodyMouseDown(e) {
      if(!this.isSpace) return;

      let { width, height} = this.$refs.rulerRef.getBoundingClientRect();

      let x = this.bodyPos.left;
      let y = this.bodyPos.top;
      let w = e.target.offsetWidth;
      let h = e.target.offsetHeight;

      // let viewW = width;
      // let viewH = height;

      let maxDisX = width - w;
      let maxDisY = height - h;

      let posX = e.clientX - x;
      let posY = e.clientY - y;

      let move = (e) => {
        let disX = e.clientX - posX;
        let disY = e.clientY - posY;

        if(disX < maxDisX) disX = maxDisX;
        if(disY < maxDisY) disY = maxDisY;

        if(disX > 0) disX = 0;
        if(disY > 0) disY = 0;
        this.bodyPos.left = disX;
        this.bodyPos.top = disY;
      };
      let up = () => {
        off(document, 'mousemove', move);
        off(document, 'mouseup', up);
        this.$emit('move', this.bodyPos);
      };

      on(document, 'mousemove', move);
      on(document, 'mouseup', up);
    },
    bodyMouseWheel(e) {
      if(!this.isSpace) return;

      // 向上滚动
      if (e.wheelDelta > 0 || e.detail < 0) {
        this.mouseChangeZoom(0.01);
      }
      // 向下滚动
      if (e.wheelDelta < 0 || e.detail > 0) {
        this.mouseChangeZoom(-0.01);
      }
    },
    // canvas
    canvasMouseDown(ev) {
      let dir = '';
      if(ev.offsetX > this.gridPadding && ev.offsetY < this.gridPadding) dir = 'x';
      if(ev.offsetX < this.gridPadding && ev.offsetY > this.gridPadding) dir = 'y';
      this.dotLine.dir = dir;
      if(!dir) return;

      this.dotLine.x = ev.offsetX;
      this.dotLine.y = ev.offsetY;
      this.wholeMoveOpe = 'canvas';
    },
    // 实线
    solLineMouseDown( index) {
      this.curSolIndex = index;
      let item = this.solLine[index];
      this.dotLine.dir = item.dir;
      this.dotLine.x = this.linePosZoom(item.x);
      this.dotLine.y = this.linePosZoom(item.y);
      this.wholeMoveOpe = 'line';
    }
  }
};
</script>

<style scoped lang="less">
  @import "rk-ruler";
</style>
