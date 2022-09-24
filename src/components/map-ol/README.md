# echart封装
## preview
[预览](./index.html#/components/map-ol/map-ol-show)
## download
[组件下载](./components/map-ol.zip)
## dependence
Vue.js、openlayers

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| mapIconData | 矢量点组件配置项 | Object | {} | -  |  {} |
## usage
```
<template>
  <map-icon-mark
    :position="mapIconData && mapIconData.position || []"
    :label="mapIconData && mapIconData.label"
    :icon="mapIconData && mapIconData.icon || defaultIconImage"
    :element-name="mapIconData && mapIconData.elementName"
    :class-name="mapIconData && mapIconData.className"
  />
</template>

<script>
export default {
  name: 'MapShow',
  components: {
    MapIconMark: () => import('./components/map-icon-mark') // 点标注
  },
  data() {
      return {
        mapData: null,
        mapCenter: [118.089425, 24.479883],
        mapZoom: 14,
        clickCenter: [0, 0],
        defaultIconImage: require('./images/red_mark.png'),
        // 点标注图层
        mapIconData: {
            position: [118.089425, 24.479883], // 标注中心点的 array， 必须
            icon: require('./images/red_mark.png'), // 文件地址 String[url]，必须，默认为null
            label: '这个是中心位置', // 标注点名称 String， 非必须， 默认为 null
            elementName: '点标识id', // 标注点识别名称 String， 可以通过 feature.get('name') 获取到， 非必须， 默认为 'el-mapIconMark'
            className: 'map-icon-mark' // 图层的class String， 非必须，默认为 'map-icon-mark'
        }
      };
    }
  }
};
</script>



```
