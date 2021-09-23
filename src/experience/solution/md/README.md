# 前端读取并展示md文件
## install
1. 安装vue-markdown
[官网](https://www.npmjs.com/package/vue-markdown)   
2. 安装text-loader   
```
// vue.config.js
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
<vue-markdown :source="h" />

<script>
import VueMarkdown from 'vue-markdown';
export default {
  components: {
    VueMarkdown,
  },
  data(){
    return {
      h: require('../src/components/picture-verify/README.md')
    };
  }
};
</script>
```
