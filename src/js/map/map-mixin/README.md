# Openlayers地图的Vue.js混入封装
## download
[库文件下载](./js/map/map-mixin.zip)
## demo
[效果预览](./index.html#/demo/map-mixin)
## dependence
ol、Vue.js环境、lodash
## install
```
import {mapCommonMixin} from './map-common-mixin';
export default {
  name: 'OlDemo',
  mixins: [mapCommonMixin],
}
```
## Methods
### addMapEventListener(eventName, callback)
地图事件监听器
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| eventName | 事件名 | String | 'mapClick' | true |  -  |
| callback | 回调 | Object | - | true  |  -  |
#### return
null
#### usage
```
this.addMapEventListener('mapClick', (data, lonLat)=>{
  console.log(lonLat);
});
```   

### triggerEvent(eventName, ...data)
触发地图事件监听器
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| eventName | 事件名 | String | 'mapClick' | true |  -  |
| data | 参数 | Any | - | false  |  -  |
#### return
null
#### usage
```
this.triggerEvent('mapClick', eventData, eventData.lonLat);
```


### initMap(options)
初始化地图
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| options | 地图的必要参数 | Object | - | false |  如下 |
##### options
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| target | 地图容器 | id或dom | - | false |  'map' |
| center | 中心点 | Array | - | false |  [118.12, 24.4869] |
| url | 瓦片地址 | String | - | false |  'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f' |
#### return
ol.Map
#### usage
```
this.initMap({
  target: 'map',
  center: [118.12, 24.4869],
  url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f'
});
```

### showPoint(options)
显示单个点位
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| options | 显示单个点位的必要参数 | Object | - | true |  如下 |
##### options
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| item | 含经纬度的点位信息 | Object | - | true |  - |
| style | 样式 | Function、Object | - | false | - |
| layer | 图层 | ol/layer | - | true |  - |
#### return
null
#### usage
```
this.showPoint(
	{
	  layer: this.iconLayer,
	  item: {
	    lon: 118.12,
	    lat: 24.48,
	    text: '111'
	  },
	  style(feature){
	    return {
	      icon: startIcon,
	      text: feature.getProperties().text
	    };
	  }
	}
);
```

### showPoints(option)
显示多个点位
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| options | 显示多个点位的必要参数 | Object | - | true |  如下 |
##### options
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| list | 含经纬度的点位列表 | Array | - | true |  - |
| style | 样式 | Function、Object | - | false | - |
| layer | 图层 | ol/layer | - | true |  - |
#### return
null
#### usage
```
this.showPoints({
  layer: this.iconLayerEnd,
  list: [
    {
      lonLat: [118.15364562988282, 24.507671026611323],
      text: '100'
    },
    {
      lonLat: [118.14368927001954, 24.456172613525386],
      text: '222'
    },
  ],
  style(feature) {
    return {
      icon: startIcon,
      text: feature.getProperties().text
    };
  },
});
```


### showClusterPoints(options)
显示聚合点位
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| options | 显示聚合点位的必要参数 | Object | - | true |  如下 |
##### options
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| list | 含经纬度的点位列表 | Array | - | true |  - |
| layer | 图层 | ol/layer | - | true |  - |
#### return
null
#### usage
```
let clusterLayer = this.getClusterLayer((feature)=> {
  return {
    icon: icon,
    color: '#3399CC',
    text: feature.get('features')[0].getProperties().text
  };
});
this.showClusterPoints({layer: clusterLayer, list: clusterList});
```

### clearLayer(layer)
清空图层
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| layer | 图层 | ol/layer | - | true |  - |
#### return
null
#### usage
```
this.clearLayer(this.clickLayer);
```


### setMapCenter(option)
设置中心点
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| options | 中心点相关信息 | Object | - | true |  如下 |
##### options
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| hasAnimate | 是否有动画 | Boolean | - | false | false |
| lonLat | 中心点经纬度 | Array | - | true |  - |
| zoom | 层级 | Number | - | false |  - |
| offset | 中心点偏移量，以像素单位 | Array[Number] | - | false | [0, 0] |
#### return
null
#### usage
```javascript
this.setMapCenter({
    hasAnimate: true,
    lonLat: [118.14368927001954, 24.456172613525386],
    zoom: 10,
		offset:[0, 0]
});
```

### getVectorLayer(styleOption)
新建图层
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| styleOption | 样式设置 | Function\Object | - | false |  - |
#### return
ol.layer.Vector
#### usage
```javascript
this.iconLayerEnd = this.getVectorLayer(
    function (feature){
        return {
            icon: endIcon,
            text: feature.getProperties().text
        };
    }
);
```

### getClusterLayer(styleOption)
新建聚合图层
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| styleOption | 样式设置 | Function\Object | - | false |  - |
#### return
ol.layer.Vector
#### usage
```javascript
let clusterLayer = this.getClusterLayer((feature)=> {
    return {
        icon: icon,
        color: '#3399CC',
        text: feature.get('features')[0].getProperties().text
    };
});
```


### createSelect(option)
新建select
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| option | select必要设置 | Object | - | false |  - |
##### options
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| layers | 绑定的图层 | ol.layer.Vector | - | false | - |
| style | 样式设置 | Function\Object | - | true |  - |
| isCluster | 是否聚合图层 | Boolean | - | false |  false |
| callback | 选择后的回调 | Function | - | true |  - |
#### return
ol.interaction.Select
#### usage
```javascript
this.createSelect({
  style:(feature)=> {
    return {
      icon: startIcon,
      color: 'orange',
      text: feature.get('features')[0].getProperties().text
    };
  },
  isCluster: true,
  layers: [clusterLayer],
  callback(feature, info) {
    console.log(feature, info);
    // console.log(feature.get('features'));
    // if(feature.)
    // console.log(feature, info);
  }
});
```

### drawLine(linePoints, layer)
画带箭头的线条
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| linePoints | select必要设置 | Object | - | false |  - |
| layer | 图层 | Object | - | false |  - |
#### return
null
#### usage
```javascript
this.lineLayer = this.getVectorLayer();
this.drawLine([
    [118.2266017150879, 24.560886053466792],
    [118.24514114379883, 24.439006475830073],
    [118.16205703735352, 24.402270941162104]
], this.lineLayer);
```

### fitViewZoom(pointList)
根据点位列表，缩放移动到合适的地图层级和范围
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| pointList | 点位列表 | Array | - | true |  - |
#### return
null
#### usage
```javascript
this.fitViewZoom([
    [118.2266017150879, 24.560886053466792],
    [118.24514114379883, 24.439006475830073],
    [118.16205703735352, 24.402270941162104]
]);
```

### createOverLayer(ref, offset)
创建地图弹窗
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| ref | 地图弹窗的dom | DOM | - | true |  - |
| offset | 弹窗偏移 | Array | - | false |  - |
#### return
ol.Overlay
#### usage
```javascript
this.dialog = this.createOverLayer(this.$refs.dialog, [0, 50]);
this.dialog.setPosition([118.15364562988282, 24.507671026611323]);
```


### showPolygon(options)
显示网格
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| layer | 图层 | ol.layer.Vector | - | true |  - |
| list | 网格数据的三维数组 | Array | - | true |  - |
| text | 各个网格的标题 | Array | - | false |  - |
#### return
null
#### usage
```javascript
this.showPolygon({
    layer: this.polygonLayer,
    text: ['思明区', '湖里区'],
    list: [
        [
            [118.15364562988282, 24.507671026611323],
            [118.14368927001954, 24.456172613525386],
            [118.12, 24.48]
        ],
        [
            [118.15364562988282, 24.507671026611323],
            [118.14368927001954, 24.456172613525386],
            [118.18304304071664, 24.47451119964748]
        ],
    ]
});
```

### getPolygonCenter(list)
获取多边形中心点
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| list | 多边形数据的二维数组 | Array | - | true |  - |
#### return
null
#### usage
```javascript
let center = this.getPolygonCenter([
    [118.15364562988282, 24.507671026611323],
    [118.14368927001954, 24.456172613525386],
    [118.12, 24.48]
]);
```

### draw(options)
鼠标绘制
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| type | 绘制类型 | String | 'LineString'、'Polygon'、'Circle' | true |  - |
| layer | 图层 | ol.layer.Vector | - | true |  - |
#### return
ol/interaction/Draw
#### usage
```javascript
this.drawer = this.draw({
    layer: this.drawVector,
    type: 'LineString'
});
```

### stopDraw(drawer)
停止绘制
#### arg
| 参数 |	说明 |类型 |可选值	| 是否必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  | ----  | 
| drawer | ol/interaction/Draw | ol/interaction/Draw | - | true |  - |
#### return
null
#### usage
```javascript
this.stopDraw(this.drawer)
```
