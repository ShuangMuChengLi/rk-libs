# 常用webpack配置汇总(VueJS环境)
## 1. 加载worker文件的配置
### demo
[预览](./index.html#/demo/worker-demo)
### dependence
worker-loader
###  vue.config.js
```
let configVue = {
  chainWebpack (webpackConfig) {
    webpackConfig.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end();
  }
};
module.exports = configVue;
```
### usage
#### worker文件
以worker.js结尾，例如test.worker.js
```
self.postMessage({ foo: 'foo' });
```

#### 加载worker文件
以worker.js结尾，例如test.worker.js
```
<template>
  <div>
    worker获取到的数据：{{ data.foo }}
  </div>
</template>

<script>
import TestWorker from './test.worker.js';
export default {
  name: 'VueTest',
  data () {
    return {
      data: {}
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init(){
      const w = new TestWorker();
      w.onmessage = (event)=>{
        this.data = event.data;
      };
    }
  }
};
</script>
```
## 2. 加载md文件的配置
### dependence
text-loader
###  vue.config.js
```
let configVue = {
  chainWebpack (webpackConfig) {
    webpackConfig.module
      .rule('file')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end();
  },
};
module.exports = configVue;

```
### usage
```
require('../src/experience/solution/publish-system/README.md')
```


