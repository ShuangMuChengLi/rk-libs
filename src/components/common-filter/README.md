# 可配置筛选栏表单common-filter
## preview
[预览](./index.html#/components/common-filter)
## download
[组件下载](./components/common-filter.zip)
## dependence
Vue.js、ElementUI

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| formInfo | 筛选栏信息 | Array | true | -  |  - |
### column参数
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| prop | 字段名 | String/Array | true | -  |  - |
| label | 字段标题 | String | true | -  |  - |
| type | 字段类型 | String | true | 'dateRange'、'select'、'input'、'slot'  |  - |
| slot | 插槽名 | String | false | -  |  - |
| options | 下拉框的选项列表 | Array | false | -  |  - |
## event
| 事件名称 |	说明 |回调参数 |
| ---- | ---- |---- |
| submit | 提交事件 | 筛选表单数据 | 
## usage
```
<template>
  <div class="filter-wrapper">
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline"
      size="mini"
    >
      <template v-for="(item, key) in formInfo">
        <el-form-item
          v-if="item.type === 'dateRange'"
          :key="'formInfoItem' + key"
          :label="item.label"
        >
          <el-date-picker
            v-model="form[item.prop[0]]"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          />
          <span> - </span>
          <el-date-picker
            v-model="form[item.prop[1]]"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          />
        </el-form-item>

        <el-form-item
          v-if="item.type === 'select'"
          :key="'formInfoItem' + key"
          :label="item.label"
        >
          <el-select
            v-model="form[item.prop]"
            clearable
          >
            <el-option
              v-for="(option, index) in item.options"
              v-show="!option.hidden"
              :key="Math.random() + index"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'input'"
          :key="'formInfoItem' + key"
          :label="item.label"
        >
          <el-input
            v-model="form[item.prop]"
            clearable
          />
        </el-form-item>
        <el-form-item
          v-if="item.slot"
          :key="'formInfoItem' + key"
          :label="item.label"
        >
          <slot
            :name="item.slot"
            :form="form"
          />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          查询
        </el-button>
        <el-button
          type="info"
          @click="reset"
        >
          重置
        </el-button>
      </el-form-item>
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
export default {
  name: 'CommonFilter',
  props:{
    auto: {
      type: Boolean,
      default: false
    },
    formInfo: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      form: {
      },
    };
  },
  mounted() {
    this.form = {};
    for(let item of this.formInfo){
      if(_.isArray(item.prop)){
        for(let i = 0; i < item.prop.length; i++){
          let prop = item.prop[i];
          this.$set(this.form, prop, item.defaultValue ? item.defaultValue[i] : null);
        }
      }else{
        this.$set(this.form, item.prop, item.defaultValue || null);
      }

    }
    if(this.auto){
      this.onSubmit();
    }
  },
  methods: {
    onSubmit() {
      for(let item of this.formInfo){
        if(item.type === 'dateRange'){
          let beginTime = this.form[item.prop[0]];
          let endTime = this.form[item.prop[1]];
          if(beginTime && endTime && moment(beginTime).isAfter(moment(endTime))){
            this.$message.error(item.label + '的开始时间大于结束时间');
            return;
          }
        }
      }
      this.$emit('submit', this.form);
    },
    reset() {
      this.form = {};
      for(let item of this.formInfo){
        this.$set(this.form, item.prop, item.defaultValue || null);
      }
      this.$emit('submit', this.form);
    }
  }
};
</script>

<style scoped lang="less">
@import "filter";
</style>

```
