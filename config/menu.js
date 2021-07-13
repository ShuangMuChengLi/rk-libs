export const menu = [
  {
    label: '组件',
    children: [
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
          }
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
          }
        ]
      },
      {
        label: '数学',
        children: [
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
          }
        ]
      },
      {
        label: 'html',
        children: [
          {
            label: '会话存储和本地存储',
            source: require('../src/js/html/storage-util/README.md')
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
            source: require('../src/js/html/watermark/README.md')
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
        label: '算法',
        children: [
          {
            label: '语义识别、关键词提取',
            source: require('../src/experience/get-keyword/README.md')
          }
        ]
      },
      {
        label: 'html',
        children: [
          {
            label: '屏幕截屏',
            source: require('../src/experience/screenshot/README.md')
          }
        ]
      },
      {
        label: '特效',
        children: [
          {
            label: '动态连接颗粒背景',
            source: require('../src/experience/special-effects/particles/README.md')
          }
        ]
      },
    ]
  }
];
