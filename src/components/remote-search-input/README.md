# 可自定义输入的远程搜索输入框
elementUI的远程搜索必须从下拉框中选择一项，项目中有需求可以自定义输入（兼顾词条联想和普通输入框的功能）。
## preview
[预览](./index.html#/demo/remote-search-input)
## download
[组件下载](./components/remote-search-input.zip)
## dependence
Vue.js\ElementUI环境

## component
### remote-search-input   
远程搜索输入框
#### Attributes
| 参数 |	说明 |类型 |是否必填 | 可选值	| 默认值 |
| ---- | ---- |---- | ---- | ----   |----  | 
| v-model | 绑定的值 | Any | 是 | - | -  | 
| label | 绑定的标题 | Any | 否 | - | -  | 
| remote-method | 远程函数 | Function | 是 | - | -  | 
| placeholder | placeholder | String | 否 | - | -  | 

### remote-search-input-item
远程搜索输入框子项
#### Attributes
| 参数 |	说明 |类型 |是否必填 | 可选值	| 默认值 |
| ---- | ---- |---- | ---- | ----   |----  | 
| value | 绑定的值 | Any | 是 | - | -  | 
| label | 绑定的标题 | Any | 否 | - | -  | 
## usage
```
<template>
  <div class="demo-wrapper">
    <remote-search-input
      v-model="value"
      :label.sync="label"
      :remote-method="remoteMethod"
      placeholder="尝试输入陈或林"
    >
      <remote-search-input-item
        v-for="item of options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </remote-search-input>
  </div>
</template>

<script>
import RemoteSearchInput from './remote-search-input';
import RemoteSearchInputItem from './remote-search-input-item';
export default {
  name: 'RemoteSearchInputDemo',
  components: {RemoteSearchInputItem, RemoteSearchInput},
  data(){
    return {
      options: [],
      label: '',
      value: ''
    };
  },
  methods:{
    remoteMethod(val){
      setTimeout(()=>{
        if(val.includes('林')){
          this.options = [
            {
              label: '林群',
              value: '01',
            },
            {
              label: '林冲',
              value: '02',
            },
          ];
          return;
        }

        if(val.includes('陈')){
          this.options = [
            {
              label: '陈菌',
              value: '03',
            },
            {
              label: '陈伟',
              value: '04',
            }
          ];
          return;
        }

        return [];
      });
    }
  }
};
</script>
```
可以使用插槽
```
<remote-search-input
  v-model="value"
  :label.sync="label"
  :remote-method="remoteMethod"
  placeholder="尝试输入陈或林"
>
  <remote-search-input-item
    v-for="item of options"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  >
    <span>{{ item.label }}</span>
  </remote-search-input-item>
</remote-search-input>
```
