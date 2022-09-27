<template>
  <div
    id="scene"
    class="deskBg"
  >
    <div
      class="layer bg-bottom"
      data-depth="0.20"
    >
      <div class="" />
    </div>
    <div style="background: rgba(15,51,57,0.3);width: 100%;height: 100%;position:absolute;top: 0;left: 0;" />
    <div
      class="layer bg-item"
      data-depth="0.30"
    >
      <div class="" />
    </div>
    <div class="mask" />
  </div>
</template>

<script>
import './parallax';
export default {
  name: 'PortalBg',
  mounted(){
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);
  }
};
</script>

<style scoped lang="less">
  .deskBg{
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .layer{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .bg-bottom{
    width: 120%;
    height: 120%;
    left: -10%!important;
    top: -10%!important;
    background-image: url("./bg/bg0.png");
    background-size: cover;
    &.login-page {
      background-image: url("./bg/bg0.png");
    }
  }
  .bg-item{
    width: 100%;
    height: 100%;
    &>div{
      position: absolute;
      background: url("./bg/bg2.png");
      width: 1680px;
      height: 740px;

      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      //animation: op 3s infinite linear;
    }
    // &.login-page > div {
      // display: none;
    // }
  }
  .mask{
    background: url('./bg/bg3.png');
    background-size:cover;
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  @keyframes op {
    0%{
      opacity: 1;
    }
    60%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
</style>
