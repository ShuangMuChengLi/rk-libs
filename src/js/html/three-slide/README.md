# 基于threejs的三维轮盘幻灯片
## preview
[预览](./index.html#/demo/three-slide-demo)
## download
[库文件下载](./js/html/three-slide.zip)
## dependence
three、tween
## Class
```
ThreeSlide(options);
```
## options
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| source | 幻灯的列表的Id | String | 是 | -  | 
| target | 幻灯渲染的Id | String | 是 | -  | 

## methods
### toggle
幻灯暂停或者播放
#### arg
null
#### return
null

### reload
幻灯重新加载
#### arg
null
#### return
null

## usage
```
<template>
  <div class="wrapper">
    <el-button
      type="primary"
      @click="stop"
    >
      {{ isStop? '继续': '暂停' }}
    </el-button>
    <el-button
      type="primary"
      @click="add"
    >
      添加幻灯并重载
    </el-button>
    <div
      id="target"
      class="ctx"
    >
    </div>
    <div
      v-show="false"
      id="source"
      class="ctx"
    >
      <div
        v-for="item in count"
        :key="item"
        class="item"
      >
        <div class="item-inner">
          <img src="./1.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ThreeSlide } from '@/js/html/three-slide/three-slide';
export default {
  name: 'ThreeSlideDemo',
  data(){
    return {
      isStop: false,
      first: null,
      second: null,
      count: 5
    };
  },
  mounted () {
    this.first = new ThreeSlide({
      source: 'source',
      target: 'target'
    });
  },
  methods:{
    stop(){
      this.isStop = !this.isStop;
      this.first.toggle();
    },
    add(){
      this.count ++;
      this.$nextTick(()=>{
        this.first.reload();
      });
    }
  }
};
</script>

<style scoped lang="less">
.wrapper{
  width: 500px;
  height: 400px;
  .ctx{
    width: 100%;
    height: 100%;
    .item{
      width: 500px;
      height: 500px;
      .item-inner{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 400px;
        }
      }
    }
  }
}
</style>

```
