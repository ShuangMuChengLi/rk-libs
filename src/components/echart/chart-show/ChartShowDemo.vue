<!--
 * @Author: clp
 * @Description: echart 组件使用
 * @Date: 2022-08-14
-->
<template>
  <div class="chart-show-demo-page">
    <div
      class="chart-list"
      v-for="(item, index) in chartList"
      :key="'chart-list' + index"
    >
      <div class="title">{{ item.title }}</div>
      <chart-base class="chart" :optionData="item.chartData" />
    </div>
  </div>
</template>

<script>
import ChartBase from '../ChartBase'; // 引入Echart组件
export default {
  name: 'ChartShowDemo',
  components: {
    ChartBase
  },
  data() {
    return {
      chartList: [
        {
          title: '水滴图',
          chartData: {
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
        },
        {
          title: '柱状图',
          chartData: {
            legend: {
              show: false
            },
            xAxis: {
              type: 'category',
              lineStyle: {
                color: '#ffffff'
              }
            },
            yAxis: {
              type: 'value'
            },
            axisPointer: {
              type: 'line',
              axis: 'y',
              lineStyle: {
                type: 'line',
                color: '#ffffff'
              },
              snap: true,
              handle: {
                show: false
              }
            },
            tooltip: {
              formatter: params => {
                const str =
                  params.data.name + '<br/><b style="font-size: 16px; color: #ffffff;">' + params.data.count + '</b> 家';
                return str;
              }
            },
            dataset: {
              dimensions: ['product', 'count'],
              source: [
                { product: 'A', count: 823, name: '苹果' },
                { product: 'B', count: 235, name: '香蕉' },
                { product: 'C', count: 1042, name: '葡萄' },
                { product: 'D', count: 988, name: '芭乐' },
                { product: 'E', count: 988, name: '弥猴桃' }
              ]
            },
            series: [
              {
                type: 'bar',
                // data: [120, 200, 150, 80, 70],
                stack: 'total',
                barWidth: '30%',
                color: {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 1,
                      color: ['rgba(255, 255, 242, 1)'] // 0% 处的颜色
                    },
                    {
                      offset: 0.98,
                      color: ['rgba(255, 255, 242, 1)'] // 0% 处的颜色
                    },
                    {
                      offset: 0.97,
                      color: ['rgba(32, 255, 242, 0.6)'] // 0% 处的颜色
                    },
                    {
                      offset: 0,
                      color: ['rgba(32, 255, 242, 0.2)'] // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            ]
          }
        },
        {
          title: '扇形图',
          chartData: {
            color: ['#fcc143', '#07d6ef', '#4becae'],
            legend: {
              orient: 'vertical',
              icon: 'circle',
              top: 'auto',
              right: -5,
              bottom: 0,
              itemWidth: 10,
              itemHeight: 10,
              padding: 10,
              itemGap: 18,
              textStyle: {
                fontSize: 14
              }
            },
            tooltip: {
              show: true,
              trigger: 'item',
              // formatter: '{b} : {c} ({d}%)',
              formatter: params => {
                const str =
                  params.data.name + '<br/><b style="font-size: 1vw; color: #ffffff;">' + params.data.value + '</b>';
                return str;
              }
            },
            xAxis: { show: false },
            yAxis: { show: false },
            dataset: {
              dimensions: ['name', 'show'],
              source: [
                { show: 700, value: 16269, name: '苹果' },
                { show: 600, value: 16036, name: '香蕉' },
                { show: 500, value: 69, name: '葡萄' }
              ]
            },
            series: [
              {
                name: '水果类型',
                type: 'pie', // 饼图
                radius: ['40%', '70%'], // 饼图大小
                center: ['40%', '50%'],
                roseType: 'area',
                // itemStyle: {
                //   borderColor: 'rgba(0, 28, 55, 0.55)', // '#23333a',
                //   borderWidth: nowSIze(1)
                // },
                label: {
                  show: true,
                  // formatter: '{c}',
                  formatter: params => {
                    // return params.data.value
                    const strNum = params.data.value;
                    if (strNum.length <= 3) {
                      return strNum;
                    }
                    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
                      return strNum;
                    }
                    const a = RegExp.$1;
                    let b = RegExp.$2;
                    const c = RegExp.$3;
                    const re = new RegExp();
                    re.compile('(\\d)(\\d{3})(,|$)');
                    while (re.test(b)) {
                      b = b.replace(re, '$1,$2$3');
                    }
                    return a + '' + b + '' + c;
                  },
                  color: 'inherit',
                  fontStyle: 'normal',
                  fontSize: 18,
                  fontWeight: 'bold',
                  borderWidth: 0,
                  edgeDistance: 0
                },
                labelLine: {
                  show: false,
                  length: 5,
                  length2: 5,
                  length3: 5
                }
                // data: []
              }
            ]
          }
        },
        {
          title: '现状图',
          chartData: {
            legend: {
              show: true,
              icon: 'rect',
              itemWidth: 12,
              itemHeight: 10,
              right: 10,
              top: 15
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              name: 'H',
              nameTextStyle: {
                color: '#ffffff',
                fontSize: 12
              },
              type: 'category',
              boundaryGap: false
              // data: [
              //   '00', '01', '02', '03', '04', '05',
              //   '06', '07', '08', '09', '10', '11',
              //   '12', '13', '14', '15', '16', '17',
              //   '18', '19', '20', '21', '22', '23'
              // ]
            },
            yAxis: {
              name: '频次/千',
              nameTextStyle: {
                color: '#ffffff',
                fontSize: 12
              },
              type: 'value',
              axisLabel: {
                formatter: val => {
                  return val.toFixed(2);
                }
              }
            },
            dataset: {
              dimensions: ['time', 'today', 'yesterday'],
              source: [
                { time: '00', today: 0.03, yesterday: 1.21 },
                { time: '01', today: 0.15, yesterday: 0.61 },
                { time: '02', today: 1.11, yesterday: 0.81 },
                { time: '03', today: 1.13, yesterday: 0.82 },
                { time: '04', today: 1.14, yesterday: 0.82 },
                { time: '05', today: 1.15, yesterday: 0.82 },
                { time: '06', today: 1.16, yesterday: 0.82 },
                { time: '07', today: 2.17, yesterday: 0.82 },
                { time: '08', today: 1.18, yesterday: 1.81 },
                { time: '09', today: 1.19, yesterday: 0.82 },
                { time: '10', today: 1.44, yesterday: 0.82 },
                { time: '11', today: 1.66, yesterday: 1.82 },
                { time: '12', today: 1.98, yesterday: 0.83 },
                { time: '13', today: 0.88, yesterday: 0.66 },
                { time: '14', today: 1.12, yesterday: 1.82 },
                { time: '15', today: 0.34, yesterday: 0.82 },
                { time: '16', today: 0.12, yesterday: 1.86 },
                { time: '17', today: 0.67, yesterday: 0.88 },
                { time: '18', today: 0.88, yesterday: 1.8 },
                { time: '19', today: 0.67, yesterday: 0.66 },
                { time: '20', today: 0.6, yesterday: 1.3 },
                { time: '21', today: 0.88, yesterday: 0.2 },
                { time: '22', today: 0.12, yesterday: 1.22 },
                { time: '23', today: 1.13, yesterday: 0.23 }
              ]
            },
            series: [
              {
                name: '男孩',
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                  width: 3
                },
                color: {
                  type: 'linear',
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 1,
                      color: ['#1e9bfb']
                    },
                    {
                      offset: 0,
                      color: ['#3cfffd']
                    }
                  ],
                  global: false // 缺省为 false
                }
                // data: [
                //   0.06, 0.21, 0.30, 0.45, 1.12, 0.17,
                //   0.17, 0.06, 0.21, 0.30, 0.45, 0.17,
                //   1.12, 0.17, 0.21, 0.30, 0.45, 0.17,
                //   0.06, 0.21, 0.30, 0.45, 1.12, 0.17
                // ]
              },
              {
                name: '女孩',
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                  width: 3
                },
                color: {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: ['#fffd72']
                    },
                    {
                      offset: 1,
                      color: ['#ffa201']
                    }
                  ],
                  global: false // 缺省为 false
                }
                // data: [
                //   1.12, 0.17, 0.21, 0.30, 0.45, 0.30,
                //   0.06, 0.21, 0.30, 0.45, 1.12, 0.30,
                //   0.06, 0.21, 0.30, 0.45, 1.12, 0.30,
                //   0.17, 0.06, 0.21, 0.30, 0.45, 0.30
                // ]
              }
            ]
          }
        },
        {
          title: '电量',
          chartData: {
            legend: {
              show: false
            },
            tooltip: {
              show: false
            },
            grid: {
              top: 0,
              right: 10
            },
            xAxis: {
              type: 'value',
              axisLabel: { show: false }
            },
            yAxis: {
              type: 'category',
              // data: ['已用', '闲置'],
              axisLabel: { show: false },
              splitLine: {
                show: false
              }
            },
            dataset: {
              dimensions: ['name', 'count', 'total'],
              source: [
                { name: '待招商面积', count: 78, total: 100 }
              ]
            },
            series: [
              {
                name: '条',
                type: 'bar',
                // data: [19269, 987],
                barWidth: 15,
                color: {
                  type: 'linear',
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: ['#00F0FF']
                    },
                    {
                      offset: 1,
                      color: ['#46A6FF']
                    }
                  ],
                  global: false // 缺省为 false
                },
                itemStyle: {
                  normal: {
                    barBorderWidth: 5,
                    barBorderColor: 'transparent' // '#012446'
                  }
                }
              },
              {
                name: '进度条背景',
                type: 'bar',
                barGap: '-100%',
                barWidth: 15,
                // data: [30000, 30000],
                color: 'transparent',
                itemStyle: {
                  normal: {
                    barBorderRadius: 0,
                    barBorderColor: '#0eaab9',
                    barBorderWidth: 0.5
                  }
                }
              }
            ]
          }
        },
        {
          title: '堆叠柱状图',
          chartData: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
              }
            },
            legend: {
              icon: 'rect',
              right: 0,
              itemWidth: 12,
              itemHeight: 8
            },
            grid: {
              left: 0,
              right: 0
            },
            xAxis: {
              type: 'category'
              // data: ['第1季度', '第2季度', '第3季度', '第4季度']
            },
            yAxis: {
              name: 'w㎡',
              nameTextStyle: {
                color: '#ffffff',
                fontSize: 12
              },
              type: 'value'
            },
            dataset: {
              source: [
                ['第一季度', 200, 100],
                ['第二季度', 20, 100],
                ['第三季度', 500, 100],
                ['第四季度', 200, 800]
              ]
            },
            series: [
              {
                name: '建设面积',
                type: 'bar',
                stack: 'total',
                barWidth: '25%',
                // data: [800, 600, 700, 600],
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 1,
                        color: ['#FBD35A']
                      },
                      {
                        offset: 0,
                        color: ['#E4891E']
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              },
              {
                name: '已建设面积',
                type: 'bar',
                stack: 'total',
                barWidth: '25%',
                // data: [1200, 1500, 2000, 2300],
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 1,
                        color: ['#52EBF6']
                      },
                      {
                        offset: 0,
                        color: ['#3395FA']
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              }
            ]
          }
        },
        {
          title: '饼图',
          chartData: {
            color: [
              {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: ['#506eda']
                  },
                  {
                    offset: 0,
                    color: ['#7c8dff']
                  }
                ],
                global: false // 缺省为 false
              },
              {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: ['#14c672']
                  },
                  {
                    offset: 0,
                    color: ['#14c672']
                  }
                ],
                global: false // 缺省为 false
              },
              {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: ['#fec600']
                  },
                  {
                    offset: 0,
                    color: ['#f96005']
                  }
                ],
                global: false // 缺省为 false
              },
              {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: ['#52ebf6']
                  },
                  {
                    offset: 0,
                    color: ['#3395fa']
                  }
                ],
                global: false // 缺省为 false
              },
              {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: ['#fbd93c']
                  },
                  {
                    offset: 0,
                    color: ['#fe9351']
                  }
                ],
                global: false // 缺省为 false
              },
              {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: ['#06f3b3']
                  },
                  {
                    offset: 0,
                    color: ['#86fbff']
                  }
                ],
                global: false // 缺省为 false
              }
            ],
            legend: {
              top: 'bottom',
              itemWidth: 6,
              itemHeight: 6,
              icon: 'circle',
              fontStyle: {
                fontSize: 10
              } // ,
              // formatter: function (name) {
              //   return (name.length > 3 ? (name.slice(0, 3) + '...') : name)
              // }
            },
            tooltip: {
              show: true,
              trigger: 'item',
              // formatter: '{b} : {c} ({d}%)',
              formatter: params => {
                const str =
                  params.data.name + '<br/><b style="font-size: 1vw; color: #ffffff;">' + params.data.value + '</b>㎡';
                return str;
              }
            },
            xAxis: { show: false },
            yAxis: { show: false },
            dataset: {
              dimensions: ['name', 'value'],
              source: [
                { value: 12265, name: '苹果' },
                { value: 22650, name: '香蕉' },
                { value: 12265, name: '葡萄' }
              ]
            },
            series: [
              {
                name: '园区车位',
                type: 'pie', // 饼图
                radius: ['45%', '60%'], // 饼图大小
                center: ['50%', '40%'],
                // roseType: 'area',
                // itemStyle: {
                //   borderWidth: nowSIze(2),
                //   borderColor: 'transparent', // '#012446'
                //   shadowBlur: nowSIze(5),
                //   shadowColor: '#7C8DFF'
                // },
                label: {
                  show: true,
                  formatter: params => {
                    const num = params.data.value.toString();
                    const reg = num.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
                    // const str = params.data.name + '\n' + num.replace(reg, '$1,') + '㎡'
                    const str = num.replace(reg, '$1,');
                    return str;
                  },
                  color: '#ffffff',
                  fontStyle: 'normal',
                  fontSize: 12,
                  fontWeight: 'bold',
                  borderWidth: 0,
                  edgeDistance: 0
                },
                labelLine: {
                  show: false,
                  length: 5,
                  length2: 5,
                  length3: 5
                }
                // data: []
              }
            ]
          }
        },
        {
          title: '电池',
          chartData: {
            legend: {
              show: false
            },
            tooltip: {
              show: false
            },
            grid: {
              top: 0,
              right: 10
            },
            xAxis: {
              type: 'value',
              axisLabel: { show: false },
              axisLine: { show: false }
            },
            yAxis: {
              type: 'category',
              // data: ['已用', '闲置'],
              axisLine: { show: false },
              axisLabel: { show: false },
              axisTick: { show: false },
              splitLine: {
                show: false
              },
              // max:10, 设置y刻度最大值，相当于设置总体行高
              inverse: true // 横向进度条的关键
            },
            dataset: {
              dimensions: ['name', 'count', 'total'],
              source: [
                { name: '在线', count: 16, total: 20 }
              ]
            },
            series: [
              {
                name: '条',
                type: 'pictorialBar',
                symbolRepeat: 'fixed',
                symbolMargin: 1,
                symbol: 'rect', // 内部类型（方块，圆，svg，base64图片）
                symbolClip: true,
                symbolSize: [6, 8], // 进度条的宽高
                symbolOffset: [5, 0], // 柱子的位置偏移
                // data: [19269, 987],
                z: 2,
                itemStyle: {
                  normal: {
                    barBorderRadius: 7,
                    color: '#02f0fe' // 柱体的颜色
                  }
                },
                zlevel: 1
              },
              {
                name: '进度条背景',
                type: 'bar',
                barGap: '-100%',
                barWidth: 16,
                symbolOffset: [5, 0], // 柱子的位置
                // data: [30000, 30000],
                color: 'none',
                itemStyle: {
                  normal: {
                    barBorderRadius: 0,
                    barBorderColor: '#039ee5',
                    barBorderWidth: 1
                  }
                }
              }
            ]
          }
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
  .chart-show-demo-page{
    position: relative;
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #333333;
    color: #ffffff;
    overflow: hidden;
    .chart-list {
      display: flex;
      width: 22%;
      height: 300px;
      flex-flow: column;
      border: solid 1px #dedede;
      margin-right: 10px;
      .title {
        display: flex;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
        border-bottom: solid 1px #dedede;
      }
      .chart{
        flex: 1;
        display: flex;
        width: 100%;
        height: calc(100% - 30px);
      }
    }
  }
</style>
