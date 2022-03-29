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
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      }
    };
  },
  mounted() {
    this.form = {};
    for(let item of this.formInfo){
      if(Array.isArray(item.prop)){
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
@import "./filter";
</style>
