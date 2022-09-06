<template>
  <el-form
    ref="form"
    class="form"
    :class="{'double-column': doubleColumn}"
    :inline="doubleColumn"
    :size="size"
    :model="form"
    :rules="rules"
    :label-width="labelWidth"
  >
    <template v-for="(item, key) in formInfoSelf">
      <el-form-item
        v-if="item.type === 'input'"
        :key="'formInfoItem' + key"
        class="item"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
      >
        <el-input
          v-model="form[item.prop]"
          clearable
          :style="{width: item.width? item.width+'px': null}"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          @change="change"
        />
      </el-form-item>
      <el-form-item
        v-if="item.type === 'checkbox'"
        :key="'formInfoItem' + key"
        class="item"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
      >
        <el-checkbox-group
          v-model="form[item.prop]"
          :disabled="item.disabled"
          @change="change"
        >
          <el-checkbox
            v-for="(option, index) in item.options"
            :key="Math.random() + index"
            :label="option.value"
          >
            {{ option.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        v-if="item.type === 'textarea'"
        :key="'formInfoItem' + key"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
        class="item"
      >
        <!--文本编辑-->
        <el-input
          v-model="form[item.prop]"
          type="textarea"
          :rows="3"
          :disabled="item.disabled"
        />
      </el-form-item>
      <el-form-item
        v-if="item.type === 'select'"
        :key="'formInfoItem' + key"
        class="item"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
      >
        <el-select
          v-model="form[item.prop]"
          :disabled="item.disabled"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { systemUtil } from '../../js/tools/system-util/system-util';

export default {
  name: 'CommonForm',
  props:{
    rules: {
      type: Object,
      default: null
    },
    value: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: 'mini'
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    formInfo: {
      type: Array,
      default(){
        return [];
      }
    },
	  doubleColumn: {
		  type: Boolean,
		  default: false
	  },
  },
  data() {
    return {
      form: {
      },
      formInfoSelf: []
    };
  },
  watch:{
    formInfo:{
      immediate: true,
      handler(val){
        if(!val)return;

        this.formInfoSelf = _.cloneDeep(val || []);
        this.init();
      }
    }
  },
  methods:{
    init(){
      this.form = {};
      for(let i = 0; i < this.formInfo.length; i++){
        let item = this.formInfo[i];
        if(_.isArray(item.prop)){
          for(let i = 0; i < item.prop.length; i++){
            let prop = item.prop[i];
            this.$set(this.form, prop, item.defaultValue ? item.defaultValue[i] : null);
          }
        }
        if(item.type === 'checkbox'){
          this.$set(this.form, item.prop, item.defaultValue || []);
        }else{
          this.$set(this.form, item.prop, item.defaultValue !== undefined ? item.defaultValue : null);
        }
        if(item.optionsFn){
          (async ()=>{
            let list = await item.optionsFn();
            this.$set(this.formInfoSelf[i], 'options', list);
          })();
        }
      }
      this.$emit('input', this.form);
    },
    change(){
      this.$emit('input', this.form);
    },
    async validate(){
      return await systemUtil.validateForm(this.$refs.form);
    }
  }
};
</script>

<style scoped lang="less">
  .double-column{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item{
      width: 45%;
    }
  }
</style>
