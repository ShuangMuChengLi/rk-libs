<!-- base chart 图表公共组件 -->
<template>
  <div
    :id="elId"
    class="chart"
  />
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { merge, debounce } from 'lodash';
import elementResizeDetectorMaker from 'element-resize-detector';
import chartBaseOption from './ChartBaseOption'; // 引入公共样式

export default {
  name: 'ChartBase',
  props: {
    optionData: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  data () {
    return {
      chart: null,
      elId: ''
    };
  },
  computed: {
    // 合并配置对象
    option () {
      return merge(
        {},
        chartBaseOption,
        this.optionData
      );
    }
  },
  watch: {
    optionData: {
      deep: true,
      // immediate: true,
      handler (val) {
        if (!this.chart) return false;
        this.chart.setOption(val);
      }
    }
  },
  created () {
    this.elId = this.uuid();
  },
  mounted () {
    // 实例化echarts对象
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy () {
    if (!this.chart) return false;
    this.chart.dispose(); // 销毁图表实例
    this.chart = null;
  },
  methods: {
    // 生成唯一uuid做为唯一标识符
    uuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    // 绘图
    initChart () {
      if (!document.getElementById(this.elId)) return false;
      // if (
      //   document.getElementById(this.elId).getBoundingClientRect().width === 0 &&
      //   document.getElementById(this.elId).getBoundingClientRect().height === 0
      // ) return false
      this.chart = echarts.init(document.getElementById(this.elId));
      this.chart.setOption(this.option);
      /*
      设置图表配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成
      echart会合并新的参数，刷新图表
       */
      const that = this;
      window.addEventListener(
        'resize',
        debounce(() => { // 引入debounce，防止频繁更改浏览页尺寸出现页面抖动
          if (that.chart) {
            that.chart.resize();
          }
        }, 100)
      );

      // 引入element-resize-detector监听元素大小
      const elementResize = elementResizeDetectorMaker();
      elementResize.listenTo(
        document.getElementById(this.elId),
        () => {
          setTimeout(() => {
            if (that.chart) {
              that.chart.resize();
            }
          }, 100);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
  .chart{
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>
