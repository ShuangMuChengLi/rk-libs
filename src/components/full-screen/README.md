# 全屏
## contributor
邹双玉
## preview
[预览](./index.html#/components/full-screen/FullScreenDemo)

## download
[组件下载](./components/full-screen.zip)


## dependence
null

## Functions
### beFull(el)
根据指定元素全屏/ 全屏
#### arg
| 参数     | 说明     | 类型   | 可选值 | 默认值          |
| :------- | :------- | :----- | :----- | :-------------- |
| el | 元素 | Element | -      | - | -

### exitFull()
退出全屏

### toggleFull(el)
切换全屏
#### arg
| 参数     | 说明     | 类型   | 可选值 | 默认值          |
| :------- | :------- | :----- | :----- | :-------------- |
| el | 元素 | Element | -      | - | -

### isFull()
元素是否全屏


## usage
```vue
<template>
  <div class="example">
    <div class="item">
      <h3>全屏任意元素</h3>
      <div
        id="showFull"
        class="example-contain"
      >
        <span>视频或图片</span>
      </div>
      <el-button
        type="primary"
        @click.native="fullScreen('showFull')"
      >
        全屏某个元素
      </el-button>
    </div>
    <div class="item">
      <el-button
        type="primary"
        @click.native="fullScreen"
      >
        全屏整个页面
      </el-button>
      <el-button
        type="primary"
        @click.native="exitFullScreen"
      >
        退出全屏
      </el-button>
      <el-button
        type="primary"
        @click.native="toggleFull"
      >
        切换全屏/退出
      </el-button>
      <el-button
        type="primary"
        @click.native="isFullAlert"
      >
        是否全屏
      </el-button>
    </div>
  </div>
</template>

<script>
import {beFull, exitFull, toggleFull, isFull} from './full-screen';
export default {
  name: 'FullScreenDemo',
  data() {
    return {};
  },
  methods: {
    fullScreen(el) {
      if(el){
        const element = document.getElementById(el);
        beFull(element);
      } else {
        beFull();
      }
    },
    exitFullScreen() {
      exitFull();
    },
    toggleFull() {
      toggleFull();
    },
    isFullAlert() {
      const str = isFull() ? '全屏' : '非全屏';
      this.$message.success(str);
    }
  }
};
</script>

<style scoped lang="less">
.example{
    position: relative;
    margin-left: 15px;
    .example-contain{
      width: 500px;
      height: 300px;
      margin: 0 0 10px 0;
      position: relative;
      background: black;
      text-align: center;
      >span{
        line-height: 300px;
        color: white;
        font-weight: bold;
        font-size: 20px;
      }
  }
  .item{
    margin-bottom: 5px;
  }
}
</style>


```


