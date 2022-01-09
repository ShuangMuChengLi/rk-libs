# 关键元素防篡改工具类
## preview
[预览](./index.html#/demo/tamper-protector)
## download
[库文件下载](./js/html/tamper-protector.zip)

## Class
```
new TamperProtector();
```
## methods
### add(ele)
添加关键元素
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| ele | 待监听html元素 | dom或者css选择器 | true | -  |
#### return
null

### destroy()
取消监听所有关键元素
#### arg
null
#### return
null


## usage
```
<template>
  <div>
    <p id="ele1">
      1
    </p>
    <p id="ele2">
      2
    </p>
  </div>
</template>

<script>
import { TamperProtector } from '@/js/html/tamper-protector/tamper-protector';
export default {
  name: 'TamperProtectorDemo',
  data(){
    return {
      TamperProtector: null
    };
  },
  mounted () {
    this.TamperProtector = new TamperProtector();
    this.TamperProtector.add('#ele1');
    this.TamperProtector.add('#ele2');
  },
  beforeDestroy () {
    this.TamperProtector.destroy();
  },
};
</script>
```
