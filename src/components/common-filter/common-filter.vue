<template>
  <div
    class="filter-wrapper"
  >
    <el-form
      :inline="true"
      :model="form"
      class="form"
      :size="size"
      @keydown.native.prevent.enter
    >
      <div
        v-if="$slots.left"
        class="left"
      >
        <slot
          name="left"
        />
      </div>
      <div>
        <template v-for="(item, key) in formInfoSelf">
          <el-form-item
            v-if="item.type === 'monthRange'"
            :key="'formInfoItem' + key"
            :label="item.label"
          >
            <el-date-picker
              v-model="form[item.prop[0]]"
              type="month"
              placeholder="选择月份"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
            />
            <span class="filter-time-join"> - </span>
            <el-date-picker
              v-model="form[item.prop[1]]"
              type="month"
              placeholder="选择月份"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              @change="monthEndChange(item.prop[1])"
            />
          </el-form-item>
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
              :picker-options="pickerOptionsFn(item.prop[1])"
              clearable
            />
            <span class="filter-time-join"> - </span>
            <el-date-picker
              v-model="form[item.prop[1]]"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
            />
          </el-form-item>
          <el-form-item
            v-if="item.type === 'onlyDayRange'"
            :key="'formInfoItem' + key"
            :label="item.label"
          >
            <el-date-picker
              v-model="form[item.prop[0]]"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              clearable
            />
            <span class="filter-time-join"> - </span>
            <el-date-picker
              v-model="form[item.prop[1]]"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
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
              :clearable="!item.noneClearable"
              :style="{width: item.width? item.width+'px': null}"
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
            v-show="!item.hidden"
            :key="'formInfoItem' + key"
            :label="item.label"
          >
            <el-input
              v-model="form[item.prop]"
              clearable
              :style="{width: item.width? item.width+'px': null}"
              :placeholder="item.placeholder"
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
        <el-form-item v-if="$slots.default">
          <slot />
        </el-form-item>
      </div>
      <div
        v-if="$slots.right"
        class="right"
      >
        <slot
          name="right"
        />
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import {pickerOptionsFn} from './pickerOptionsFn';
export default {
  name: 'CommonFilter',
  props: {
    auto: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'mini'
    },
    formInfo: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    return {
      form: {
      },
      formInfoSelf: [],
      pickerOptionsFn: (key)=>{
        return pickerOptionsFn(this, this.form, key);
      },
    };
  },
  watch: {
    formInfo: {
      immediate: true,
      handler(val) {
        this.formInfoSelf = _.cloneDeep(val || []);
        this.init();
      }
    }
  },
  mounted() {

  },
  methods: {
    changeUndefinedToNull(value) {
      if(value === undefined)return null;

      return value;
    },
    init() {
      this.form = {};
      for(let i = 0; i < this.formInfo.length; i++) {
        let item = this.formInfo[i];
        if(_.isArray(item.prop)) {
          for(let i = 0; i < item.prop.length; i++) {
            let prop = item.prop[i];
            this.$set(this.form, prop, item.defaultValue ? item.defaultValue[i] : null);
          }
        }else{
          this.$set(this.form, item.prop, this.changeUndefinedToNull(item.defaultValue));
        }
        if(item.optionsFn) {
          (async ()=>{
            let list = await item.optionsFn();
            this.$set(this.formInfoSelf[i], 'options', list);
          })();
        }
      }
      if(this.auto) {
        this.onSubmit();
      }
    },
    onSubmit() {
      for(let item of this.formInfoSelf) {
        if(item.type === 'dateRange') {
          let beginTime = this.form[item.prop[0]];
          let endTime = this.form[item.prop[1]];
          if(beginTime && endTime && moment(beginTime).isAfter(moment(endTime))) {
            this.$message.error(item.label + '的开始时间大于结束时间');
            return;
          }
        }
      }
      this.$emit('submit', _.clone(this.form));
    },
    reset() {
      this.form = {};
      for(let item of this.formInfoSelf) {
        if(_.isArray(item.prop)) {
          for(let i = 0; i < item.prop.length; i++) {
            let prop = item.prop[i];
            this.$set(this.form, prop, item.defaultValue ? item.defaultValue[i] : null);
          }
        }else{
          this.$set(this.form, item.prop, item.defaultValue || null);
        }
      }
      this.$emit('reset');
      this.$emit('submit', _.clone(this.form));
    },
    monthEndChange(prop) {
      this.$set(this.form, prop, moment(this.form[prop]).endOf('month').format('YYYY-MM-DD HH:mm:ss'));
    }
  }
};
</script>

<style scoped lang="less">
  @import "filter";
</style>

