# echart封装
## contributor
程丽萍
## preview
[预览](./index.html#/components/echart/chart-show)
## download
[组件下载](./components/echart.zip)
## dependence
Vue.js、echarts、echarts-liquidfill、element-resize-detector、lodash

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| optionData | 图标配置项 | Object | {} | -  |  {} |
## usage
```
<template>
  <chart-base class="chart" :optionData="chartOptionData" /> 
</template>

<script>
import ChartBase from '../ChartBase'; // 引入Echart组件
export default {
  name: 'ChartShowDemo',
  components: {ChartBase},
  data(){
    return {
      chartOptionData: {
           legend: {
             show: false
           },
           tooltip: {
             show: false
           },
           series: [
             {
               name: '办公人数',
               type: 'liquidFill', // 水球图
               data: [0.63, 0.62, 0.63, 0.64],
               waveAnimation: true,
               animationEasing: 'linear',
               animationEasingUpdate: 'linear',
               animationDuration: 1000,
               animationDurationUpdate: 500,
               radius: '80%',
               color: [
                 'rgba(29, 64, 103, 0.3)',
                 {
                   type: 'linear',
                   x: 0,
                   y: 1,
                   x2: 0,
                   y2: 0,
                   colorStops: [
                     {
                       offset: 1,
                       color: ['rgba(32, 240, 242, 1)'] // 0% 处的颜色
                     },
                     {
                       offset: 0,
                       color: ['rgba(65, 141, 235, 0.8)'] // 100% 处的颜色
                     }
                   ],
                   global: false // 缺省为 false
                 }
               ],
               outline: {
                 show: true,
                 borderDistance: 8,
                 itemStyle: {
                   color: 'none',
                   borderColor: '#4778da',
                   borderWidth: 2
                 }
               },
               backgroundStyle: {
                 color: 'rgba(34, 95, 132, 0.7)'
               },
               label: {
                 normal: {
                   color: '#fff',
                   insideColor: 'transparent',
                   textStyle: {
                     fontSize: 18,
                     // fontWeight: 'bold',
                     fontFamily: 'Microsoft YaHei'
                   }
                 }
               }
             }
           ]
         }
    };
  }
};
</script>

<style scoped lang="less">
.chart{
    width: 300px;
    hright: 300px;
}
</style>

```
