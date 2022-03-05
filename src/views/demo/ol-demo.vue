<template>
  <div class="map-wrapper">
    <div
      id="map"
      class="map"
    />
    <div ref="dialog" class="dialog">test<i class="el-icon-close" @click="closeDialog"/> </div>
  </div>
</template>

<script>
import {mapCommonMixin} from '../../experience/js/map/map-mixin/map-common-mixin';
import icon from './icon.png';
import startIcon from './start.png';
import endIcon from './end.png';
export default {
  name: 'OlDemo',
  mixins: [mapCommonMixin],
  mounted() {
    this.initMap({
      target: 'map',
      center: [118.12, 24.4869],
      url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f'
    });
    this.initLayers();
  },
  methods:{
    initLayers(){
      this.iconLayerStart = this.getVectorLayer({icon: startIcon});
      // this.createSelect({icon: startIcon, layers: [this.iconLayer], callback(e){
      //   console.log(e);
      // }});
      this.showPoint(this.iconLayerStart, {
        lon: 118.12,
        lat: 24.48,
        icon: startIcon,
      });

      this.iconLayerEnd = this.getVectorLayer({icon: endIcon});
      this.createSelect({icon: endIcon, layers: [this.iconLayerEnd], callback(feature, info){
        console.log(feature, info);
      }});
      let list = [
        {
          lonLat: [118.15364562988282, 24.507671026611323]
        },
        {
          lonLat: [118.14368927001954, 24.456172613525386]
        },
      ];
      this.showPoints(this.iconLayerEnd, list);
      this.dialog = this.createOverLayer(this.$refs.dialog, [0, 50]);
      this.dialog.setPosition([118.15364562988282, 24.507671026611323]);
      this.polygonLayer = this.getVectorLayer();
      this.showPolygon({
        layer: this.polygonLayer,
        list:[
          [118.15364562988282, 24.507671026611323],
          [118.14368927001954, 24.456172613525386],
          [118.12, 24.48]
        ]
      });
    },
    closeDialog(){
      this.dialog.setPosition(null);
    }
  }
};
</script>

<style scoped lang="less">
.map-wrapper{
  position: relative;
}
.map {
  width: 100%;
  height: 100vh;
}
.dialog{
  color: #fff;
  background-color: #000;
}
</style>
