<template>
  <div 
    class="sign-write-box"
  >
    <div 
      :class="{'dialog':(isRem === false),'rem-dialog':(isRem === true)}"
    >
      <el-dialog 
        title="签名板"
        :visible.sync="passwordShow"
        :close-on-click-modal="false"
        @close="closeFun"
      >
        <canvas
          id="s-canvas"
          class="canvas-box"
          :width="contentWidth"
          :height="contentHeight"
          @mousedown="onmousedown"
          @mousemove="onmousemove"
          @mouseup="onmouseup"
        />
        <div class="export-button">
          <el-button 
            type="primary"
            plain 
            @click="clearFun"
          >
            清空
          </el-button>
          <el-button @click="downloadFun">
            下载
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SIdentify', 
  props: {
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    contentWidth: { // 容器宽度
      type: Number,
      default: 500
    },
    contentHeight: { // 容器高度
      type: Number,
      default: 300
    },
    isRem: { // 是否使用rem
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
      start: false,
      canvas: null,
      context: null,
      passwordShow: false
    };
  },
  watch: {
    show: {
      handler: function (val) {
        if(val) {
          this.passwordShow = true;
          setTimeout(() => {
            this.canvas = document.getElementById('s-canvas');
            this.context = this.canvas.getContext('2d');
            this.drawPic(this.context);
          }, 500);
        }
      } 
    }
  },
  mounted() {
  },
  methods: {
    classFun() {
      if(this.isRem === true) {
        return('rem-dialog');
      }
      if(this.isRem === false) {
        return('dialog');
      }
    },
    closeFun() {
      this.$emit('update:show', false);
    },
    clearFun() {
      // 重置画布
      this.canvas.width = this.contentWidth;
      this.canvas.height = this.contentHeight;

      this.context.fillStyle = '#fff';
      this.context.fillRect(0, 0, this.contentWidth, this.contentHeight);
    },
    onmousedown(ev) {
      this.start = true;
      var ev = ev || window.event;
      if(this.isRem === true) {
        this.context.moveTo(ev.clientX - this.canvas.offsetLeft - this.contentWidth + 11, ev.clientY - this.canvas.offsetTop - 100 - 5);
      }
      if(this.isRem === false) {
        this.context.moveTo(ev.clientX - this.canvas.offsetLeft - this.contentWidth + 31, ev.clientY - this.canvas.offsetTop - 100 - 10);
      }
        
    },
    onmousemove(ev) {
      var ev = ev || window.event;
      if(this.start === true) {
        if(this.isRem === true) {
          this.context.lineTo(ev.clientX - this.canvas.offsetLeft - this.contentWidth + 11, ev.clientY - this.canvas.offsetTop - 100 - 5);
        }
        if(this.isRem === false) {
          this.context.lineTo(ev.clientX - this.canvas.offsetLeft - this.contentWidth + 31, ev.clientY - this.canvas.offsetTop - 100 - 10);
        }
        this.context.stroke();
      }
    },
    onmouseup() {
      this.start = false;
    },
    drawPic(ctx) {
      ctx.textBaseline = 'bottom';
      // 绘制背景
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
    },
    // 下载签名图片
    downloadFun() {
      
      // 接下来将canvas转换成base64的url
      var url = this.canvas.toDataURL('image/png');
      // 注意该方法属于canvas元素，而不是创建的context对象

      var arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1], // 此处得到的为文件类型
        bstr = atob(arr[1]), // 此处将base64解码
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      
      // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
      var file = new File([u8arr], '电子签名', { type: mime });

      var aDom = document.createElement('a'); // 创建一个 a 标签
      aDom.download = file.name; // 设置文件名
      let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
      aDom.href = href; // 放入href
      document.body.appendChild(aDom); // 将a标签插入 body
      aDom.click(); // 触发 a 标签的点击
      document.body.removeChild(aDom); // 移除刚才插入的 a 标签
      URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
    }
  }
};
</script>
 
<style scoped lang="less">
  .canvas-box {
    border: 1px solid black;
  }
  .dialog {
    /deep/ .el-dialog{
      width: 600px;
      height: 500px;
    }
    /deep/ .el-dialog__body {
      text-align: center;
    }
    .export-button {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }
  .rem-dialog {
    /deep/ .el-dialog{
      width: 700px;
      height: 550px;
    }
    /deep/ .el-dialog__body {
      text-align: center;
    }
    .export-button {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }
</style>