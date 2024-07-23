<template>
  <div class="FireVideoBoardMap board-map">
    <div
      id="map"
      class="map"
    />
    <el-button
      class="btn"
      type="primary"
      @click="test"
    >
      测试
    </el-button>
  </div>
</template>

<script>
import {mapCommonMixin} from '@/components/map-mixin/map-common-mixin';
import {systemUtil} from '@/utils/util';
import alarmCluster from './images/alarm-cluster.png';
import alarmClusterActive from './images/alarm-cluster-active.png';
import fixCluster from './images/fix-cluster.png';
import fixClusterActive from './images/fix-cluster-active.png';
import alarm from './images/alarm.png';
import alarmActive from './images/alarm-active.png';
import fix from './images/fix.png';
import fixActive from './images/fix-active.png';
import Fill from 'ol/src/style/Fill';
import Stroke from 'ol/style/Stroke';
export default{
  name: 'FireAlarmBoardMap',
  mixins: [mapCommonMixin],
  data() {
    return{
      layerInfo: {
        alarm: {
          layer: null,
          icon: alarm,
          activeIcon: alarmActive,
          clusterIcon: alarmCluster,
          clusterActiveIcon: alarmClusterActive,
        },
        fix: {
          layer: null,
          icon: fix,
          activeIcon: fixActive,
          clusterIcon: fixCluster,
          clusterActiveIcon: fixClusterActive,
        },
      },
      activeFeature: null
    };
  },
  mounted() {
    this.init();
    this.bus.$on('BoardMap:showPointByType', this.showPointByType);
    this.bus.$on('BoardMap:setMapCenter', this.setMapCenter);
    this.bus.$on('BoardMap:setPointActiveById', this.setPointActiveById);
  },
  beforeDestroy() {
    this.bus.$off('BoardMap:showPointByType', this.showPointByType);
    this.bus.$off('BoardMap:setMapCenter', this.setMapCenter);
    this.bus.$off('BoardMap:setPointActiveById', this.setPointActiveById);
  },
  methods: {
    init() {
      this.map = this.initMap({
        target: 'map',
        center: [118.12, 24.4869],
        url: 'http://44.64.18.81:7100/mapImageServer/showElecPic?imgFormat=png&x={x}&y={y}&z={z}'
      });
      this.addMapEventListener('mapClick', (data)=>{
        if(_.isEmpty(data.features))return;
        
        this.setPointActiveByFeature(data.features[0], true);
        this.bus.$emit('BoardMap:pointClick', data.properties);
      });
      for(let key in this.layerInfo) {
        let item = this.layerInfo[key];
        let clusterLayer = this.getClusterLayer(()=> {
          return {
            icon: item.icon,
            activeIcon: item.activeIcon,
            clusterIcon: item.clusterIcon,
            clusterActiveIcon: item.clusterActiveIcon,
            color: '#fff',
            textInfo: {
              fill: new Fill({
                color: '#fff',
              }),
              offsetY: -10,
              offsetX: 9,
            }
          };
        });
        item.layer = clusterLayer;
        // item.select = this.createSelect({
        //   isCluster: false,
        //   style(feature) {
        //     return {
        //       icon: item.activeIcon,
        //       // text: feature.getProperties().text
        //     };
        //   },
        //   layers: [layer],
        //   callback: (options)=>{
        //     console.log(options);
        //   }
        // });
      }
      let clusterList = [
        {
          id: '1',
          lonLat: [118.18935119628907, 24.503551153564448],
        },
        {
          id: '2',
          lonLat: [118.19278442382813, 24.482951788330073],
        },
  
      ];
      this.showClusterPoints({layer: this.layerInfo.alarm.layer, list: clusterList});
      let stationInfo = systemUtil.getCurrentStation();
      if(stationInfo.longitude) {
        this.setMapCenter({
          lonLat: [stationInfo.longitude, stationInfo.latitude],
          zoom: 5
        });
      }
    },
    showPointByType(list, type) {
      // let filterList = list.filter((item)=>{
      //   return item.longitude && item.latitude;
      // });
      this.showPoints(
        {
          layer: this.layerInfo[type].layer,
          list
        }
      );
    },
    setPointActiveById(type, id, isActive, isCenter) {
      let layerInfo = this.layerInfo[type];
      let feature =  layerInfo.layer.getSource().getSource().getFeatureById(id);
      if(!feature) {
        console.error('未找到点位', type, id);
        return;
      }
      
      this.setPointActiveByFeature(feature, isActive);
      if(isCenter) {
        let data = feature.getProperties();
        this.setMapCenter({
          lonLat: [data.longitude, data.latitude],
          zoom: 18,
          hasAnimate: true
        });
      }
    },
    test() {
      let feature = this.layerInfo.alarm.layer.getSource().getFeatures()[0].get('features');
      console.log(feature);
    },
    setPointActiveByFeature(feature, isActive) {
      let features = feature.get('features');
      let isCluster = !features || features.length !== 1;
      if(!isCluster) {
        feature = features[0];
      }
      if(isActive) {
        if(this.activeFeature && feature !== this.activeFeature) {
          this.setPointActiveByFeature(this.activeFeature, false);
        }
  
        this.activeFeature = feature;
        feature.set('isActive', true);
      }else{
        this.activeFeature = null;
        feature.set('isActive', false);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./FireAlarmBoardMap";
</style>

