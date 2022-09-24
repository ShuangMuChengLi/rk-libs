<!--
 * @Author: clp
 * @Description: openlayers 的简单组件的封装
 * @Date: 2022-09-24
-->
<template>
  <div class="map-show-page">
    <!-- 地图 -->
    <div
      ref="MapShowRef"
      class="map"
    />

    <!-- 经纬度的显示 -->
    <div class="click-center">
      {{ clickCenter }}
    </div>

    <!-- demo 操作按钮 -->
    <div class="show-btn-block">
      <div class="row">
        <el-button
          size="mini"
          @click="addIconMark(true)"
        >
          添加一个矢量点
        </el-button>
        <el-button
          size="mini"
          @click="addIconMark(false)"
        >
          删除矢量点
        </el-button>
      </div>
      <div class="row">
        <el-button
          size="mini"
          @click="addBrokenLine(true)"
        >
          添加折线
        </el-button>
        <el-button
          size="mini"
          @click="addBrokenLine(false)"
        >
          删除折线
        </el-button>
      </div>
      <div class="row">
        <el-button
          size="mini"
          @click="addSmoothLine(true)"
        >
          添加曲线
        </el-button>
        <el-button
          size="mini"
          @click="addSmoothLine(false)"
        >
          删除曲线
        </el-button>
      </div>
      <div class="row">
        <el-button
          size="mini"
          @click="addPolygon(true)"
        >
          添加多边形
        </el-button>
        <el-button
          size="mini"
          @click="addPolygon(false)"
        >
          删除多边形
        </el-button>
      </div>
      <div class="row">
        <el-button
          size="mini"
          @click="addCircle(true)"
        >
          添加圆形
        </el-button>
        <el-button
          size="mini"
          @click="addCircle(false)"
        >
          删除圆形
        </el-button>
      </div>
      <div class="row">
        <el-button
          size="mini"
          @click="addOverlay(true)"
        >
          添加覆盖物
        </el-button>
        <el-button
          size="mini"
          @click="addOverlay(false)"
        >
          删除覆盖物
        </el-button>
      </div>
    </div>

    <!--
      点标注，
      如果只想用文字标注label，可以把图片设置成一个像素的透明图片，
      如果只想用图标就label设置为null
      使用循环的方法，可以添加多个矢量点
    -->
    <map-icon-mark
      :position="mapIconData && mapIconData.position || []"
      :label="mapIconData && mapIconData.label"
      :icon="mapIconData && mapIconData.icon || defaultIconImage"
      :element-name="mapIconData && mapIconData.elementName"
      :class-name="mapIconData && mapIconData.className"
    />

    <!-- 折线 -->
    <map-broken-line
      :point-list="mapBrokenLineData && mapBrokenLineData.pointList || []"
      :line-color="mapBrokenLineData && mapBrokenLineData.lineColor"
      :line-width="mapBrokenLineData && mapBrokenLineData.lineWidth"
      :line-dash="mapBrokenLineData && mapBrokenLineData.lineDash"
      :element-name="mapBrokenLineData && mapBrokenLineData.elementName"
      :class-name="mapBrokenLineData && mapBrokenLineData.className"
    />

    <!-- 曲线 -->
    <map-smooth-line
      :point-list="mapSmoothLineData && mapSmoothLineData.pointList || []"
      :line-color="mapSmoothLineData && mapSmoothLineData.lineColor"
      :line-width="mapSmoothLineData && mapSmoothLineData.lineWidth"
    />

    <!-- 多边形 -->
    <map-polygon
      :point-list="mapPolygonData && mapPolygonData.pointList || []"
      :fill-color="mapPolygonData && mapPolygonData.fillColor"
      :line-color="mapPolygonData && mapPolygonData.lineColor"
      :line-width="mapPolygonData && mapPolygonData.lineWidth"
      :line-dash="mapPolygonData && mapPolygonData.lineDash"
      :element-name="mapPolygonData && mapPolygonData.elementName"
      :class-name="mapPolygonData && mapPolygonData.className"
    />

    <!-- 圆形 -->
    <map-circle
      :position="mapCircleData && mapCircleData.position || []"
      :radius="mapCircleData && mapCircleData.radius"
      :fill-color="mapCircleData && mapCircleData.fillColor"
      :line-color="mapCircleData && mapCircleData.lineColor"
      :line-width="mapCircleData && mapCircleData.lineWidth"
      :line-dash="mapCircleData && mapCircleData.lineDash"
      :element-name="mapCircleData && mapCircleData.elementName"
      :class-name="mapCircleData && mapCircleData.className"
    />

    <!-- 自定义覆盖物 -->
    <MapOverlay
      :position="mapOverlayData && mapOverlayData.position"
      :offset="mapOverlayData && mapOverlayData.offset"
      :class-name="mapOverlayData && mapOverlayData.className"
    >
      <div>
        <img
          :src="defaultIconImage"
          alt=""
        >
        <h5>自定义覆盖物</h5>
      </div>
    </MapOverlay>
  </div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import * as olControl from 'ol/control';
import mapConfig from './config/map-config';
export default {
  name: 'MapShow',
  components: {
    MapIconMark: () => import('./components/map-icon-mark'), // 点标注
    MapBrokenLine: () => import('./components/map-broken-line'), // 折线
    MapSmoothLine: () => import('./components/map-smooth-line'), // 曲线
    MapPolygon: () => import('./components/map-polygon'), // 多边形
    MapCircle: () => import('./components/map-circle'), // 圆形
    MapOverlay: () => import('./components/map-overlay') // 覆盖物
  },
  data() {
    return {
      mapData: null,
      mapCenter: [118.089425, 24.479883],
      mapZoom: 13,
      clickCenter: [0, 0],
      defaultIconImage: require('./images/red_mark.png'),
      mapIconData: null, // 矢量点的标注
      mapBrokenLineData: null, // 折线
      mapSmoothLineData: null, // 曲线
      mapPolygonData: null, // 多边形
      mapCircleData: null, // 圆形
      mapOverlayData: null, // 自定义覆盖物
    };
  },
  mounted() {
    this.initMap(); // 初始化地图
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
      const mapContainer = this.$refs.MapShowRef;
      const fullScreen = new olControl.FullScreen(); //全屏控件，显示在右上角
      const map = new Map({
        layers: mapConfig.streetMap(2),
        controls: [fullScreen],
        target: mapContainer,
        view: new View({
          projection: 'EPSG:4326',
          center: this.mapCenter,
          zoom: this.mapZoom
        })
      });
      // 添加鼠标点击事件
      map.on('click', (evt) => this.mapClick(evt));
      // 添加鼠标经过事件
      map.on('pointermove', (evt) => this.mapPointerMove(evt));
      this.mapData = map;
    },
    /**
     * 地图点击
     */
    mapClick(evt) {
      this.clickCenter = evt.coordinate; // 获取点击的中心点
    },
    /**
     * 鼠标划过地图事件
     */
    mapPointerMove(evt) {
      if (evt.dragging) {
        return false;
      }
    },
    /**
     * 添加&清除矢量点
     */
    addIconMark(type) {
      if (!type) {
        this.mapIconData = null;
        return false;
      }
      this.mapIconData = {
        position: [118.089425, 24.479883], // 标注中心点的 array， 必须
        icon: require('./images/red_mark.png'), // 文件地址 String[url]，必须，默认为null
        label: '这个是中心位置', // 标注点名称 String， 非必须， 默认为 null
        elementName: '点标识id', // 标注点识别名称 String， 可以通过 feature.get('name') 获取到， 非必须， 默认为 'el-mapIconMark'
        className: 'map-icon-mark' // 图层的class String， 非必须，默认为 'map-icon-mark'
      };
    },
    /**
     * 添加&删除折线
     * @param type
     */
    addBrokenLine(type) {
      if (!type) {
        this.mapBrokenLineData = null;
        return false;
      }
      this.mapBrokenLineData = {
        pointList: [ // 线条所有的点数组 Array[array]， 必须
          [118.13073235993387, 24.533700182779317],
          [118.1582035446644, 24.521075024946217],
          [118.14371693377497, 24.512703850610738],
          [118.16693011169436, 24.50542969976235]
        ],
        elementName: '地图线条', //弹窗标识别名 String， 非必须，默认为 'el-mapLineString'
        lineColor: 'rgba(0,77,168,0.9)', // 线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2, // 线条宽度 Number，非必须，默认为 2
        lineDash: [2, 10], // 虚线 Array[number]， 是否使用虚线，默认为 null
        className: 'map-line-string', // 图层的class String， 非必须， 默认 "map-line-string"
        zIndex: 300 // 图层z轴高度， 非必须， 默认 300
      };
    },
    /**
     * 添加&删除曲线
     * @param type
     */
    addSmoothLine(type) {
      if (!type) {
        this.mapSmoothLineData = null;
        return false;
      }
      this.mapSmoothLineData = {
        pointList: [ // 线条所有的点数组 Array[array]， 必须
          [118.16286276864622, 24.48967986492911],
          [118.14642864708902, 24.495549782855992],
          [118.16592294220926, 24.51542361055184]
        ],
        lineColor: 'rgba(0,77,168,0.9)', // 线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2 // 线条宽度 Number，非必须，默认为 2
      };
    },
    /**
     * 添加&删除多边形
     * @param type
     */
    addPolygon(type){
      if (!type) {
        this.mapPolygonData = null;
        return false;
      }
      this.mapPolygonData = {
        pointList:[
          [ 117.99873280768396, 24.529627248390202 ],
          [ 118.03365382795336, 24.512233122928624 ],
          [ 118.01426145677569, 24.500721081836705 ],
          [ 117.99904930834772, 24.5042683032589 ],
          [ 117.98478800301554, 24.53176094566155 ]
        ],
        fillColor: 'rgba(255,0,0,0.8)', // 多边形填充颜色，非必须，默认为 'rgba(0,0,0,0.8)'
        elementName: '地图多边形', // 多边形识别名称 String, 非必须，默认为 'el-mapPolygon'
        lineColor: 'rgba(0,0,0,0.5)', // 多边形线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2, // 多边形线条宽度 Number，非必须，默认为 2
        lineDash: null, // 多边形虚线 Array[number], 是否使用虚线 ，默认为 null
        className: 'map-polygon' // 图层的class String, 非必须，默认为 'map-polygon'
      };
    },
    /**
     * 添加&删除圆形
     * @param type
     */
    addCircle(type) {
      if (!type) {
        this.mapCircleData = null;
        return false;
      }
      this.mapCircleData = {
        position: [ 117.99444931988718, 24.479064926250462 ], // 圆中心点 Array， 必须
        radius: 1000, // 圆半径 number ，默认为 100
        fillColor: 'rgba(255,255,0,0.5)', // 圆形填充颜色，非必须，默认为 'rgba(255,255,255,0.5)'
        elementName: '圆形叠加', // 圆形识别名称 String, 非必须，默认为 'el-mapCircle'
        lineColor: '#409eff', // 圆形线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2, // 圆形线条宽度 Number，非必须，默认为 2
        lineDash: [20, 5], // 圆形虚线 Array[number], 是否使用虚线 ，默认为 null
        className: 'map-circle' // 图层的class String, 非必须，默认为 'map-circle'
      };
    },
    /**
     * 添加&删除覆盖物
     * @param type
     */
    addOverlay(type) {
      if (!type) {
        this.mapOverlayData = null;
        return false;
      }
      this.mapOverlayData = {
        position: [ 118.14654666428568, 24.46173651490975 ], // 标注中心点 Array, 必须
        className: 'map-overlay', // 设置自定义图层的class String ，非必须， 默认 'map-overlay'
        offset: [0, 0] // 设置自定义图层的偏移量 Array[number] ，非必须,默认[0, 0]
      };
    }
  }
};
</script>

<style scoped lang="less">
  .map-show-page{
    position: relative;
    width: 100vw;
    height: 100vh;
    .map{
      width: 100%;
      height: 100%;
    }
    .click-center{
      position: absolute;
      top: 10px;
      right: 60px;
      padding: 10px;
      z-index: 2;
      background: #000000;
      color: #fff;
      border-radius: 4px;
    }
    .show-btn-block{
      position: absolute;
      display: flex;
      flex-flow: column;
      top: 5px;
      left: 5px;
      z-index: 2;
      .row{
        margin-bottom: 5px;
      }
    }
  }
</style>
