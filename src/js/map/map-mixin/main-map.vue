<template>
  <homepage-box class="main-map-box">
    <div
      id="mapWrapper"
      class="main-map-wrapper"
    >
      <div
        id="homepageMap"
        class="main-map-container"
      />
      <map-search-box class="map-search-box" />
      <map-filter-box class="map-filter-box" />
      <map-draw-box
        @draw="draw"
        @cancel="removeDrawer"
      />
      <div
        ref="mapCaptureDetailRef"
      >
        <capture-dialog
          :is-map-dialog="true"
          :dialog-info="dialogInfo.alarm"
          @close="closeDialog('alarm')"
        />
      </div>
      <div
        v-show="mapInited"
        ref="policeAlarmMapDialogRef"
      >
        <police-alarm-map-dialog
          :dialog-info="dialogInfo.policeAlarm"
          @close="closeDialog('policeAlarm')"
        />
      </div>
      <div
        v-show="mapInited"
        ref="devicePositionRef"
      >
        <!-- 设备的相关使用信息 -->
        <device-map-dialog
          :dialog-info="dialogInfo.device"
          @close="closeDialog('device')"
        />
      </div>
      <div
        v-show="mapInited"
        ref="clusterRef"
      >
        <cluster-map-dialog
          :list="dialogInfo.cluster.list"
          @clusterCheck="clusterCheck"
          @close="closeDialog('cluster')"
        />
      </div>
      <video-dialog
        v-if="isShowVideo"
        :visible.sync="isShowVideo"
        :device-id="currentDeviceId"
      />
    </div>
  </homepage-box>
</template>

<script>
import HomepageBox from '../common/homepage-box/homepage-box';
import MapFilterBox from './map-filter-box/map-filter-box';
import MapSearchBox from './map-search-box/map-search-box';
import config from '../../../../config/config';
import _ from 'lodash';
import policeAlarmIcon from './images/police-alarm-icon.png';
import deviceIcon from './images/device.png';
import alarmIcon from './images/alarm-icon.png';
import {homepageUtil} from '../js/homepage-util';
import PoliceAlarmMapDialog from './police-alarm-map-dialog/police-alarm-map-dialog';
import DeviceMapDialog from './device-map-dialog/device-map-dialog';
import VideoDialog from '../../common/video-dialog/video-dialog';
import ClusterMapDialog from './cluster-map-dialog/cluster-map-dialog';
import CaptureDialog from '../../common/capture-dialog/capture-dialog';
import MapDrawBox from './map-draw-box/map-draw-box';
const View = ol.View;
const Map = ol.Map;
const controlDefault = ol.control.defaults;
const Tile = ol.layer.Tile;
const VectorLayer = ol.layer.Vector;
const VectorSource = ol.source.Vector;
const XYZ = ol.source.XYZ;
const Feature = ol.Feature;
const Point = ol.geom.Point;
const Icon = ol.style.Icon;
const Style = ol.style.Style;
const Overlay = ol.Overlay;
const Select = ol.interaction.Select;
const Polygon = ol.geom.Polygon;
const Draw = ol.interaction.Draw;
const createBox = ol.interaction.Draw.createBox;
export default {
  name: 'MainMap',
  components: {
    MapDrawBox,
    CaptureDialog,
    ClusterMapDialog,
    VideoDialog,
    DeviceMapDialog, PoliceAlarmMapDialog, MapSearchBox, MapFilterBox, HomepageBox},
  data(){
    return {
      mapObj: null,
      alarmOverlay: null,
      alarmIconLayer: null,
      policeAlarmOverlay: null,
      dialogInfo: {
        alarm: {},
        policeAlarm: {},
        device: {},
        cluster: {
          list: []
        },
      },
      isShowVideo: false,
      currentDeviceId: null,
      zIndex: 999,
      mapInited: false,
      select: null,
      drawSource: null,
      drawer: null,
      statisticsDialogVisible: false
    };
  },
  mounted() {
    this.init();
    this.bus.$on('main-map:showDialog', this.showDialogFromOutside);
    this.bus.$on('main-map:setMapCenter', this.setMapCenterByLonLat);
    this.bus.$on('main-map:removePointById', this.removePointById);
    this.bus.$on('main-map:showPoints', this.showPoints);
    this.bus.$on('main-map:hidePoints', this.hidePoints);
    this.bus.$on('openVideo', this.openVideo);
  },
  beforeDestroy() {
    this.bus.$off('main-map:setMapCenter', this.setMapCenterByLonLat);
    this.bus.$off('main-map:showDialog', this.showDialogFromOutside);
    this.bus.$off('main-map:removePointById', this.removePointById);
    this.bus.$off('main-map:showPoints', this.showPoints);
    this.bus.$off('main-map:hidePoints', this.hidePoints);
    this.bus.$off('openVideo', this.openVideo);
  },
  methods: {
    init(){
      this.mapInited = true;
      this.initMap();
    },
    getIconStyle(type, zIndex) {
      let typeIconMap = {
        alarm: alarmIcon,
        policeAlarm: policeAlarmIcon,
        device: deviceIcon,
      };
      return new Style({
        image: new Icon({
          src: typeIconMap[type],
        }),
        zIndex
      });
    },
    createLayer(type){
      let layer = new VectorLayer({
        source: new VectorSource(),
        style: () => {
          return this.getIconStyle(type);
        }
      });
      this.mapObj.addLayer(layer);
      return layer;
    },
    createSelect(){
      let select = new Select({
        layers: [this.alarmIconLayer, this.policeAlarmIconLayer, this.deviceIconLayer],
        style: (e) => {
          let info = e.getProperties();
          return this.getIconStyle(info.type);
        }
      });
      select.on('select', (e) => {
        let feature = e.selected[0];
        if(feature){
          let lonLat = feature.getGeometry().getCoordinates();
          let info = feature.getProperties();
          let dialogType;
          let dialogInfo;
          if(info.lonLatGroup && info.lonLatGroup.length > 1){
            dialogInfo = {
              data: info,
              list: info.lonLatGroup,
              lonLat: lonLat,
              type: info.type,
            };
            dialogType = 'cluster';
            // 聚合弹窗
          }else{
            dialogInfo = info;
            dialogType = info.type;
          }
          this.mapSelectHandler(dialogInfo, dialogType, lonLat);
          this.setMapCenter([lonLat[0], lonLat[1]]);
        }
      });
      this.mapObj.addInteraction(select);
      this.select = select;
    },
    clusterCheck(item){
      this.mapSelectHandler(item, this.dialogInfo.cluster.type, this.dialogInfo.cluster.lonLat, this.dialogInfo.cluster.offsetY);
    },
    mapSelectHandler(info, dialogType, lonLat){
      this.$set(this.dialogInfo, dialogType, info);
      this.closeAllDialog();
      this.getLayerByType(dialogType).overlay.setPosition(lonLat);
    },
    createOverLayer(ref, offset){
      let overlay = new Overlay({
        element: ref,
        autoPan: true,
        offset: offset,
        positioning: 'center-left',
        autoPanAnimation: {
          duration: 250
        }
      });
      this.mapObj.addOverlay(overlay);
      return overlay;
    },
    initMap(){
      // 瓦片图层
      let tile = new Tile({
        source: new XYZ({
          url: config.map_url // 白色矢量地图
        })
      });
        // 视图
      let center = [118.12, 24.5069];
      this.mapView = new View({
        center: center, // 地图中心
        zoom: 12.5, // 缩放级别
        maxZoom: 18,
        minZoom: 11,
        projection: 'EPSG:4326'
      });
      // 地图对象
      this.mapObj = new Map({
        target: 'homepageMap', // 容器
        view: this.mapView,
        layers: [tile],
        controls: controlDefault({
          zoom: false
        })
      });
      this.alarmIconLayer = this.createLayer('alarm');
      this.deviceIconLayer = this.createLayer('device');
      this.policeAlarmIconLayer = this.createLayer('policeAlarm');

      this.alarmOverlay = this.createOverLayer(this.$refs.mapCaptureDetailRef, [-659 / 2, -280]);
      this.policeAlarmOverlay = this.createOverLayer(this.$refs.policeAlarmMapDialogRef, [-307 / 2, -152]);
      this.deviceOverlay = this.createOverLayer(this.$refs.devicePositionRef, [-307 / 2, -152]);
      this.clusterOverlay = this.createOverLayer(this.$refs.clusterRef, [-307 / 2, -152]);


      this.drawSource = new VectorSource({wrapX: false});
      const drawVector = new VectorLayer({
        source: this.drawSource
      });
      this.mapObj.addLayer(drawVector);
      this.createSelect();
      this.mapObj.on('click', (e)=>{
        console.log(e.coordinate);
      });
    },
    mapCenterOffsetFromHeight(l) {
      // 地图视图像素为[0, 0]的经纬度
      let viewStart = this.mapObj.getCoordinateFromPixel([0, 0]);
      // 地图视图像素为[200, 0]的经纬度
      let viewEnd = this.mapObj.getCoordinateFromPixel([0, l]);
      let offset = viewEnd[1] - viewStart[1];
      // 经度偏移量
      return offset;
    },
    closeDialog(dialogType){
      this.getLayerByType(dialogType).overlay.setPosition(undefined);
        this.select.getFeatures()?.clear();
    },
    closeAllDialog(){
      let overlayList = ['device', 'alarm', 'policeAlarm', 'cluster'];
      for(let item of overlayList){
        this.closeDialog(item);
      }
    },
    getLayerByType(type){
      let typeLayerMap = {
        alarm: {
          layer:this.alarmIconLayer,
          overlay: this.alarmOverlay,
          dialogHeight: 500
        },
        policeAlarm: {
          layer:this.policeAlarmIconLayer,
          overlay: this.policeAlarmOverlay,
        },
        device: {
          layer:this.deviceIconLayer,
          overlay: this.deviceOverlay,
        },
        cluster: {
          overlay: this.clusterOverlay,
        },
      };
      if(type && typeLayerMap[type]){
        return typeLayerMap[type];
      }else{
        return null;
      }
    },
    showPoints(list, type){
      let layer = this.getLayerByType(type).layer;
      let featureList = [];
      let filterList = [];
      for(let item of list){
        let lonLat = homepageUtil.changeLonLat(item);
        if(!lonLat){
          continue;
        }

        item.lonLat = lonLat;
        filterList.push(item);
      }
      let lonLatGroup = _.groupBy(filterList, (item)=>{
        item.groupId = JSON.stringify(item.lonLat);
        return item.groupId;
      });
      for(let item of filterList){
        if(type === 'policeAlarm'){
          // console.log(item.lonLat);
        }
        if(!item.lonLat){
          continue;
        }

        item.lonLatGroup = lonLatGroup[item.groupId];
        let feature = new Feature({
          geometry: new Point(item.lonLat)
        });
        feature.setProperties({type});
        if(item.id){
          feature.setId(item.id);
        }
        feature.setProperties(item);
        featureList.push(feature);
      }

      // console.log(type, layer, featureList, list);
      layer.getSource().addFeatures(featureList);
    },
    hidePoints(type){
      let layer = this.getLayerByType(type).layer;
      layer.getSource().clear();
    },
    removePointById(id, type){
      let layer = this.getLayerByType(type).layer;
      let feature = layer.getSource().getFeatureById(id);
      if(feature){
        layer.getSource().removeFeature(feature);
      }
    },
    showDialogFromOutside(){
      this.bus.$emit('map-filter-box:hideALl');
      this.showDialog(...arguments);
    },
    showDialog(item, type) {
      console.log(item);
      if(!item)return;

      this.closeAllDialog();
      item.type = type;
      let layerInfo = this.getLayerByType(type);
      let layer = layerInfo.layer;


      let lonLat = homepageUtil.changeLonLat(item);
      if(!lonLat){
        this.$message.error('无经纬度');
        return;
      }

      let feature = layer.getSource().getFeatureById(item.id);
      if(!feature){
        feature = new Feature({
          geometry: new Point(lonLat),
          index: 999
        });
        feature.setProperties({type});
        feature.setId(item.id);
        feature.setStyle(this.getIconStyle(type, this.zIndex++));
        feature.setProperties(item);
        layer.getSource().addFeatures([feature]);
      }else{
        feature.setStyle(this.getIconStyle(type, this.zIndex++));
      }
      let offset = 0;
      if(layerInfo.dialogHeight){
        offset = this.mapCenterOffsetFromHeight(layerInfo.dialogHeight);
      }

      this.getLayerByType(type).overlay.setPosition(lonLat);
      this.$set(this.dialogInfo, type, item);
      this.setMapCenter([lonLat[0], lonLat[1] - offset / 2]);
    },
    /**
       * 移动到地图中心
       */
    setMapCenterByLonLat(lonLat) {
      this.mapView.animate({
        center: lonLat,
        duration: 1000,
        zoom: 17
      });
    },
    /**
       * 移动到地图中心
       */
    setMapCenter(lonLat) {
      this.mapView.setCenter(lonLat);
    },
    /**
       * 打开视频弹框
       *
       *
       * */
    openVideo(gbId){
      this.currentDeviceId = gbId;
      this.isShowVideo = true;
    },
    removeDrawer(){
      this.drawSource.clear();
      this.stopDrawer();
    },
    stopDrawer(){
      if(this.drawer){
        this.mapObj.removeInteraction(this.drawer);
        this.drawer = null;
      }
    },
    draw(value){
      this.removeDrawer();
      let geometryFunction, type = value;
      if(value === 'box'){
        geometryFunction = createBox();
        type = 'Circle';
      }
      this.drawer = new Draw({
        source: this.drawSource,
        type,
        freehand: true,
        geometryFunction
      });
      this.drawer.on('drawstart', (e)=> {
        this.drawSource.clear();
      });
      this.drawer.on('drawend', (e)=> {
        let result = this.getDrawResult(e.feature, value);
        this.$emit('showStatistics', {
          drawerArg: result,
          drawerType: value,
        });
        this.$nextTick(()=>{
          this.removeDrawer();
        });

      });
      this.mapObj.addInteraction(this.drawer);
    },
    getDrawResult(geoFeature, type) {
      if (geoFeature) {
        let geometry = geoFeature.getGeometry();
        let coordinates = // 根据不同的绘制类型获取不同的坐标值。
            void 0; // 根据不同的绘制类型获取不同的坐标值。
        let result = {};
        result['drawFeatureId'] = geoFeature.id; //绘制元素的id
        result['drawFeature'] = geoFeature;
        if (type === 'Circle') {
          coordinates = geometry.getCenter();
          let u = this.mapObj.getView().getProjection().getMetersPerUnit();
          result['radius'] = geometry.getRadius() * u;
        } else {
          coordinates = geometry.getCoordinates()[0];
          let lonLats_1 = [];
          coordinates.forEach(function (xy) {
            lonLats_1.push(xy);
          });
          coordinates = lonLats_1;
        }
        result['coordinates'] = coordinates;
        result['type'] = 'drawByHandle';
        return result;
      }
    },

  }
};
</script>

<style scoped lang="less">
  @import "main-map";
</style>
