# 监听大写锁被锁定的工具类
## preview
[预览](./index.html#/demo/uppercase-lock-listener)
## download
[库文件下载](./js/html/uppercase-lock-listener.zip)
## Class
```
import UppercaseLockListener from './uppercase-lock-listener';
let UppercaseLockListenerCase = new UppercaseLockListener({
  upCallback:()=>{
  },
  lowCallback:()=>{
  }
});
```
## options
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| upCallback | 监听输入大写时的回调函数 | Function | false | -  | 
| lowCallback | 监听输入小写时的回调函数 | Function | false | -  | 

## methods
### destroy()
销毁

## usage
```
<template>
  <div class="wrapper">
    <p>请任意输入字母，从而判断大写锁是否锁定</p>
    <el-input
      v-model="text"
      type="password"
      size="mini"
    />
    <span
      v-if="!isUppercase && text"
      style="color: green"
    >大写锁未锁定</span>
    <span
      v-if="isUppercase && text"
      style="color: red"
    >大写锁已锁定</span>
  </div>
</template>

<script>
import UppercaseLockListener from './uppercase-lock-listener';

export default {
  name: 'UppercaseLockListenerDemo',
  data(){
    return {
      text: '',
      isUppercase: false,
      UppercaseLockListenerCase: null
    };
  },
  mounted(){
    this.UppercaseLockListenerCase = new UppercaseLockListener({
      upCallback:()=>{
        this.isUppercase = true;
      },
      lowCallback:()=>{
        this.isUppercase = false;
      }
    });
  },
  beforeDestroy() {
    this.UppercaseLockListenerCase.destroy();
  }
};
</script>
```
