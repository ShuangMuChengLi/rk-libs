# 人员标签组件
用于类似'刑|盗,刑|抢'这样的人员标签显示
## preview
[预览](./index.html#/components/person-label)
## download
[组件下载](./components/data/person-label.zip)
## dependence
Vue.js、lodash

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| labels | 人员标签 | String | true | -  |  - |
| limit | 个数限制 | Number | false | -  |  null |
| isRow | 每个标签是否换行显示 | Boolean | false | -  |  false |

## usage
```
<template>
  <div>
    <div>
      <person-label
        labels="刑|盗,刑|抢,刑|毒"
      />
    </div>
    <div>
      <person-label
        labels="刑|盗,刑|抢,刑|毒"
        :limit="2"
      />
    </div>
    <div>
      <person-label
        labels="刑|盗,刑|抢,刑|毒"
        :is-row="true"
      />
    </div>

  </div>

</template>

<script>
import PersonLabel from './person-label';
export default {
  name: 'PersonLabelDemo',
  components: {PersonLabel}
};
</script>

<style scoped>

</style>

```
