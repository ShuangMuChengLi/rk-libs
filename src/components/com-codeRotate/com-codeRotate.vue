<template>
  <div 
    class="code-rotate-box"
  >
    <div class="dialog">
      <el-dialog 
        title="请旋转图片至正确方向"
        :visible.sync="passwordShow"
        :close-on-click-modal="false"
        @close="closeFun"
      >
        <div>
          <div class="img-block-border">
            <img
              id="img-block"
              class="img-block"
              :src="path"
            >
          </div>
          <el-slider
            v-model="deg"
            :show-tooltip="false"
            :max="360"
            @input="changeRotateFun"
            @change="checkFun"
          />
        </div>
        <div class="export-button">
          <el-button
            type="primary"
            plain 
            @click="refreshFun()"
          >
            刷新
          </el-button>  
          <el-button @click="passwordShow = false">
            取消
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
  },
  data() {
    return{
      passwordShow: false,
      deg: 0,
      degFake: 0,
      val: 0,
      path: ''
    };
  },
  watch: {
    show: {
      handler: function (val) {
        if(val) {
          this.passwordShow = true;
          this.refreshFun();
        }
      }
    },
    identifyCode() {
      this.drawPic();
    }
  },
  mounted() {
    this.refreshFun();
  },
  methods: {
    closeFun() {
      this.deg = 0;
      this.$emit('update:show', false);
    },
    // 拖动进度条时旋转图片
    changeRotateFun() {
      let imgBlock = document.getElementById('img-block');
      this.degFake = this.deg + this.val;
      imgBlock.style.transform = 'rotate' + '(' + this.degFake + 'deg)';
    },
    // 验证
    checkFun() {
      let check = this.degFake;
      if(check >= 0 && check <= 30 || check >= 330 && check <= 360 || check >= 360 && check <= 390) {
        this.$message.success('验证成功!');
        this.passwordShow = false;
        return;
      }
    },
    // 刷新
    refreshFun() {
      this.path = require('./' + Math.ceil((Math.random() * 5)) + '.png');

      this.deg = 0;
      this.val = Math.floor(Math.random() * (321) ) + 20;
      this.degFake = this.deg + this.val;
      let imgBlock = document.getElementById('img-block');
      if(imgBlock !== null) {
        imgBlock.style.transform = 'rotate' + '(' + this.degFake + 'deg)';
      }
    }
  }
};
</script>
 
<style scoped lang="less">
  .img-block {
    height: 300px;
    width: 300px;
    border-radius: 100%;
  }
  .dialog {
    /deep/ .el-dialog{
      width: 400px;
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
</style>