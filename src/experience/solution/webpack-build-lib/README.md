# webpack编译库文件的几种形式
## 1. 打包为ES6模块
其中库文件
```
export default 1;
export let a = 1;
```
webpack配置
```
let path = require('path');
module.exports = {
  entry: {
    index: './src',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: "umd"
  },
};
```
引用方式
```
import lib, { a } from '../dist/index.js';
console.log(lib, a); // 1 1
```
## 2. 打包script方式引用，window方式调用脚本
### 如果库文件导出default，则要指定library: "库名"、libraryExport: 'default'
其中库文件
```
export default 1;
```
webpack配置
```
let path = require('path');
module.exports = {
  entry: {
    index: './src',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: "window",
    library: "rkGis",
    libraryExport: 'default',
  },
};
```
引用方式
```
<script src="../dist/index.js"></script>
<script>
console.log(rkGis);
</script>

```

### 如果库文件导出为一系列变量，若不指定library: "库名"、libraryExport,则所有变量直接挂载在window下
其中库文件
```
export let a = 1;
export let b = 1;
```
webpack配置
```
let path = require('path');
module.exports = {
  entry: {
    index: './src',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: "window",
  },
};
```
引用方式
```
<script src="../dist/index.js"></script>
<script>
console.log(a);
console.log(b);
</script>

```

### 如果库文件导出为一系列变量，若指定library: "库名"，且不指定libraryExport,则所有直接挂载在库名变量下
其中库文件
```
export let a = 1;
export let b = 1;
```
webpack配置
```
let path = require('path');
module.exports = {
  entry: {
    index: './src',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: "window",
    library: "rkGis",
  },
};
```
引用方式
```
<script src="../dist/index.js"></script>
<script>
console.log(rkGis.a); // 1
console.log(rkGis.b); // 1
</script>

```
### 如果库文件导出为一系列变量，若指定library: "库名"，且指定libraryExport,则只有指定libraryExport的变量赋值给库名变量下
其中库文件
```
export let a = 1;
export let b = 1;
```
webpack配置
```
let path = require('path');
module.exports = {
  entry: {
    index: './src',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: "window",
    library: "rkGis",
    libraryExport: 'a',
  },
};
```
引用方式
```
<script src="../dist/index.js"></script>
<script>
console.log(rkGis); // 1
console.log(rkGis.a); // undefined
console.log(rkGis.b); // undefined
</script>

```
