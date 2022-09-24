<!--
 * @Author: clp
 * @Description: openlayers 的简单组件的封装
 * @Date: 2022-09-24
-->
<template>
  <div class="map-show-page">
    <!-- 地图 -->
    <div
      class="map"
      ref="MapShowRef"
    ></div>

    <!-- 经纬度的显示 -->
    <div class="click-center">
      {{ clickCenter }}
    </div>

    <div class="show-btn-block">
      <div class="row">
        <el-button size="mini" @click="addIconMark(true)">添加一个矢量点</el-button>
        <el-button size="mini" @click="addIconMark(false)">删除矢量点</el-button>
      </div>
    </div>

    <!--
      点标注，
      如果只想用文字标注label，可以把图片设置成一个像素的透明图片，
      如果只想用图标就label设置为null
    -->
    <map-icon-mark
      :position="mapIconData && mapIconData.position || []"
      :label="mapIconData && mapIconData.label"
      :icon="mapIconData && mapIconData.icon || defaultIconImage"
      :element-name="mapIconData && mapIconData.elementName"
      :class-name="mapIconData && mapIconData.className"
    />
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
    MapIconMark: () => import('./components/map-icon-mark') // 点标注
  },
  data() {
    return {
      mapData: null,
      mapCenter: [118.089425, 24.479883],
      mapZoom: 14,
      clickCenter: [0, 0],
      defaultIconImage: require('./images/red_mark.png'),
      mapIconData: null // 矢量点的标注
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
    }
  }
</style>
