export const menu = [
  {
    label: '组件',
    children: [
      {
        label: '登录相关',
        children: [
          {
            label: '图片拼图验证码',
            source: require('../src/components/picture-verify/README.md')
          },
        ]
      },
      {
        label: '视频',
        children: [
          {
            label: '时间轴选择器',
            source: require('../src/components/progress-bar/README.md')
          },
          {
            label: 'h5s播放弹窗',
            source: require('../src/components/h5s-player-dialog/README.md')
          },
        ]
      },
      {
        label: '表单',
        children: [
          {
            label: '图片base64拖拽上传控件',
            source: require('../src/components/upLoad-files/README.md')
          },
          {
            label: '可自定义输入的远程搜索输入框',
            source: require('../src/components/remote-search-input/README.md'),
            date: '2021-11-23'

          }
        ]
      },
      {
        label: '流程图',
        children: [
          {
            label: '箭头',
            source: require('../src/components/flow-chart/arrow/README.md')
          }
        ]
      },
      {
        label: '其他',
        children: [
          {
            label: '日历（最简版骨架）',
            source: require('../src/components/rk-calendar/README.md')
          },
          {
            label: '花瓣网的超高清图片浏览弹窗',
            source: require('../src/components/zoom-picture-viewer/README.md'),
            date: '2021-10-05'
          },
          {
            label: '帷幕效果的幻灯片',
            source: require('../src/components/purdah-slide/README.md'),
            date: '2021-10-15'
          },
          {
            label: '带请求头的图片组件',
            source: require('../src/components/remote-img/README.md'),
            date: '2021-11-26'
          },
        ]
      }
    ]
  },
  {
    label: '函数',
    children: [
      {
        label: '地图',
        children: [
          {
            label: '判断点位在地图几何范围内',
            source: require('../src/js/map/intersectsCoordinate/README.md')
          },
          {
            label: '计算两经纬度点位的距离',
            source: require('../src/js/map/point-distance/README.md'),
            date: '2021-09-13'
          },
          {
            label: '对点位列表以一定距离进行聚合分组',
            source: require('../src/js/map/point-cluster/README.md'),
            date: '2021-10-13'
          },
        ]
      },
      {
        label: '数学',
        children: [
          {
            label: '数学函数库',
            source: require('../src/js/math/rk-math/README.md')
          },
          {
            label: '二维数组穷尽组合',
            source: require('../src/js/math/combination/README.md')
          },
          {
            label: '判断点位在几何图形内',
            source: require('../src/js/math/isInPolygon/README.md')
          },
          {
            label: '计算年龄',
            source: require('../src/js/math/getAge/README.md')
          },
          {
            label: 'md5、sha加密',
            source: require('../src/js/math/md5-sha/README.md')
          },
          {
            label: 'sm2加密、解密',
            source: require('../src/js/math/rk-sm2/README.md')
          },
          {
            label: '3des加密、解密',
            source: require('../src/js/math/rk-3des/README.md')
          }
        ]
      },
      {
        label: 'html',
        children: [
          {
            label: 'html关键元素防篡改工具类',
            source: require('../src/js/html/tamper-protector/README.md'),
            date: '2022-01-09'
          },
          {
            label: '会话存储和本地存储',
            source: require('../src/js/html/storage-util/README.md')
          },
          {
            label: '监听大写锁被锁定的工具类',
            source: require('../src/js/html/uppercase-lock-listener/README.md'),
            date: '2021-12-22'
          },
          {
            label: '相机抓拍工具类',
            source: require('../src/js/html/capture-pic/README.md')
          },
          {
            label: 'cookie工具类',
            source: require('../src/js/html/cookie-util/README.md')
          },
          {
            label: 'url工具类',
            source: require('../src/js/html/rk-url/README.md')
          },
          {
            label: '页面水印',
            source: require('../src/js/html/watermark/README.md'),
            date: '2022-01-05',
            info: '添加了禁止更改的回调函数'
          },
          {
            label: 'threejs的三维轮盘幻灯片',
            source: require('../src/js/html/three-slide/README.md')
          },
        ]
      },
    ]
  },
  {
    label: '技术方案',
    children: [
      {
        label: '方案',
        children: [
          {
            label: '前端发布平台',
            source: require('../src/experience/solution/publish-system/README.md')
          },
          {
            label: '语义识别、关键词提取',
            source: require('../src/experience/solution/get-keyword/README.md')
          },
          {
            label: '正则表达式汇总',
            source: require('../src/experience/solution/regular/README.md')
          },
          {
            label: 'webpack编译库文件的几种形式',
            source: require('../src/experience/solution/webpack-build-lib/README.md')
          },
          {
            label: '常用webpack配置汇总(VueJS环境)',
            source: require('../src/experience/solution/webpack/README.md')
          },
          {
            label: '前端读取或生成excel',
            source: require('../src/experience/solution/excel/README.md'),
            date: '2021-09-23'
          },
          {
            label: '前端读取并展示md文件',
            source: require('../src/experience/solution/md/README.md'),
            date: '2021-09-23'
          },
          {
            label: 'Node.js逐行读取文件',
            source: require('../src/experience/solution/readline/README.md'),
            date: '2021-10-13'
          },
          {
            label: '代码编辑器，及执行效果实时预览的方案',
            source: require('../src/experience/html/code-preview/README.md'),
            date: '2022-01-09'
          },
        ]
      },
      {
        label: 'js',
        children: [
          {
            label: 'lodash实用方法汇总',
            source: require('../src/experience/js/lodash/README.md'),
            date: '2022-01-17'
          },
        ]
      },
      {
        label: 'html',
        children: [
          {
            label: '常用css效果汇总',
            source: require('../src/experience/html/css/README.md')
          },
          {
            label: '富文本编辑器ueditor',
            source: require('../src/experience/html/editor/README.md'),
            date: '2021-09-23'
          },
          {
            label: '文字转语音',
            source: require('../src/experience/html/speech/README.md'),
            date: '2021-12-22'
          },
          {
            label: 'Vue.js防抖函数的使用',
            source: require('../src/experience/html/debounce/README.md'),
            date: '2021-12-22'
          },
          {
            label: '解决渲染巨型树卡顿的方案',
            source: require('../src/experience/html/tree/README.md'),
            date: '2021-12-23'
          },
          {
            label: '录音，并下载或上传',
            source: require('../src/experience/html/recorderjs/README.md')
          },
          {
            label: 'Vue.js页面初始化加载中效果',
            source: require('../src/experience/html/loading/README.md')
          },
          {
            label: '屏幕截屏',
            source: require('../src/experience/html/screenshot/README.md')
          },
          {
            label: 'css动画库animate.js',
            source: require('../src/experience/special-effects/animate/README.md')
          }
        ]
      },
      {
        label: '特效',
        children: [
          {
            label: '动态连接颗粒背景',
            source: require('../src/experience/special-effects/particles/README.md')
          },
          {
            label: '滚动显示特效',
            source: require('../src/experience/special-effects/wow/README.md')
          },
        ]
      },
    ]
  }
];
