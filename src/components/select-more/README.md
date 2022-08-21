# 下拉多选-列表优化
Element多选下拉组件的扩展
## preview
[预览](./index.html#/components/select-more/SelectMoreDemo)

## download
[组件下载](./components/select-more.zip)

## dependence
Vue.js\ElementUI环境

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| disabledArr       | 不可操作数组                                                 | Array   | 否       | -                 | []     |
| selectedArray     | 默认选择项                                                   | Array   | 否       | -                 | []     |
| options           | 选项列表                                                     | Array   | 否       | -                 | []     |
| optionValue       | option 对应value                                             | String  | 否       | -                 | value  |
| optionLabel       | option 对应label                                             | String  | 否       | -                 | label  |
| itemSize          | 每项高度                                                     | Number  | 否       | -                 | 34     |
| size              | select 样式                                                  | String  | 否       | medium/small/mini | small  |
| placeholder       | 占位符                                                       | String  | 否       |                   | 请选择 |
| automaticDropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | Boolean | 否       | true/false        | false  |


## event
| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| onChange | 数据发生变更的事件 |          |

## usage
```vue
<template>
  <select-more
    :options="options"
    :disabled-arr="disabledArr"
    :selected-array.sync="selectedArray"
  />
</template>

<script>
import SelectMore from '@/components/select-more/SelectMore';
export default {
  name: 'SelectMoreDemo',
  components: { SelectMore },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      disabledArr: ['选项1'],
      selectedArray: ['选项1'],
    };
  },
  methods: {
  }
};
</script>
```

