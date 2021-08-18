# 滚动显示特效
## preview
[预览](./index.html#/wow-demo)   
## download
[方案代码下载](./experience/special-effects/wow.zip)
## website
[官网](https://github.com/matthieua/WOW)
## info
由于npm install wowjs获取的包无法通过es6方式加载，download中改写了库文件作为es6方式加载
## usage
```
<template>
  <div id="container">
    <header>
      <h1>WOW.js</h1>
    </header>
    <div id="main">
      <section class="wow fadeInDown" style="background-color: #f1c40f;"></section>
      <section class="wow pulse" style="background-color: #e74c3c;" data-wow-iteration="infinite" data-wow-duration="1500ms"></section>
      <section class="section--purple wow slideInRight" data-wow-delay="2s"></section>
      <section class="section--blue wow bounceInLeft" data-wow-offset="300"></section>
      <section class="section--green wow slideInLeft" data-wow-duration="4s"></section>
    </div>
  </div>
</template>

<script>
import {WOW} from '@/experience/special-effects/wow/wow';
export default {
  name: 'WowDemo',
  mounted () {
    new WOW(
      {
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          console.log('WOW: animating <' + box.tagName.toLowerCase() + '>');
        }
      }
    ).init();
  },
};
</script>

<style scoped lang="less">
@import '../../experience/special-effects/wow/animate.css';
.wow:first-child {
  visibility: hidden;
}
.container {
  width: 980px;
  margin: 0 auto;
}
h1 {
  font-size:     72px;
  line-height:   1.5;
  color: #2c3e50;
  font-weight:   100;
}

#container {
  width:  980px;
  margin: 0 auto;
}

section {
  height: 300px;
  margin: 60px 0;
}

.section--purple {
  background-color: #9b59b6;
}

.section--blue {
  background-color: #3498db;
}

.section--green {
  background-color: #2ecc71;
}

#main {
  text-align: center;
}

#more {
  margin: 20px auto 48px;
}

</style>
```
