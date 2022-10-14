# JSON编辑器
  支持JSON编辑
  支持展示模式切换
## contributor
林佳男
## preview
[预览](./index.html#/components/json-editor/json-editor-demo)
## download
[组件下载](./components/json-editor.zip)
## dependence
jsoneditor
## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| value | json数据 | Array | - | null  | 
| mode | 展示模式 | String | ['code', 'tree','view','form'] | 'tree'  | 
| expanded-on-start | 是否默认全部展开 | Boolean | - | false  | 
| lang | 国际化 | String | ['zh', 'en','it'] | 'tree'  | 
## usage
```
<template>
  <json-editor
    v-model="value"
    mode="code"
    lang="zh"
    :expanded-on-start="true"
  />
</template>

<script>
import JsonEditor from './json-editor.vue';
export default {
  name: 'RouterMenuDemo',
  components: {
    JsonEditor
  },
  data() {
    return {
      value:{
        a:{
          b:[
            {
              c:1,
              d:true,
              e:'string'
            }
          ]
        }
      }
    };
  },
  methods: {

  }
};
</script>

```
