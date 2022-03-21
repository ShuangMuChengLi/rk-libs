<template>
  <div
    v-if="labelData.length > 0"
    :title="labels"
    class="label-item"
    :class="{'label-item-row':isRow}"
  >
    <div
      v-for="(item,index) in labelData"
      :key="index"
      class="msg-tab"
      :class="item.class"
    >
      <div v-if="index < count">
        <span class="tab-lf">{{ item.lf }}</span>
        <span class="tab-lr">{{ item.rt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'PersonLabel',
  props: {
    'labels': {
      type: String,
      default: null
    },
    'limit': {
      type: [Number, String],
      default: null
    },
    'isRow':{
      type: Boolean,
      default :false
    }
  },
  data: function () {
    return {
      count: 99,
      classType: [
        {name: '部恐', value: 1},
        {name: '重点', value: 2},
        {name: '国', value: 3},
        {name: '经', value: 4},
        {name: '治', value: 5},
        {name: '恐', value: 6},
        {name: '禁', value: 7},
        {name: '网', value: 8},
        {name: '刑', value: 9},
        {name: '火眼', value: 10},
        {name: '市局', value: 11}
      ],
      labelData: [],
      label: {}
    };
  },
  watch: {
    'labels': 'init'
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      this.labelData = [];
      let labelArr = [];
      if (this.labels) {
        labelArr = this.labels.split(',');//把获取到的参数储存到数组中
        this.count = labelArr.length;
        if (this.limit) {
          this.count = this.limit;
        }
        let labelData = [];
        for (let i = 0; i < this.count; i++) {
          if (!labelArr[i]){
            continue;
          }

          let dataArray = labelArr[i].split('|');
          let item = {
            lf: dataArray[0] || '',
            rt: dataArray[1] || ''
          };
          let index = _.findIndex(this.classType, {name: item.lf});
          if (index === -1) {
            item.class = 'theme-0';
          } else {
            item.class = 'theme-' + this.classType[index].value;
          }

          labelData.push(item);
        }
        this.labelData = labelData;
      }
    }
  }
};
</script>

<style scoped lang="less">
  @import "person-label";
</style>
