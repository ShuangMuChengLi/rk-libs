<template>
  <div class="map-wrapper">
    <div
      id="map"
      class="map"
    />
    <div
      ref="dialog"
      class="dialog"
    >
      test<i
        class="el-icon-close"
        @click="closeDialog"
      />
    </div>
  </div>
</template>

<script>
import {mapCommonMixin} from './map-common-mixin';
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
    this.clickLayer = this.getVectorLayer({
      icon: icon,
      anchor: [0.5, 1]
    });
    this.addMapEventListener('mapClick', (data, lonLat)=>{
      this.clearLayer(this.clickLayer);
      this.showPoint(
        {
          layer: this.clickLayer,
          item: {
            lon: lonLat[0],
            lat: lonLat[1],
          },
        }
      );
    });
    this.initLayers();
  },
  methods: {
    initLayers() {
      this.iconLayer = this.getVectorLayer({icon: icon});
      this.createSelect(
        {
          layers: [this.iconLayer],
          callback(e) {
            console.log(e);
          },
          style(feature){
            return {
              icon: startIcon,
              text: feature.getProperties().text
            };
          }
        },
      );
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

      this.iconLayerEnd = this.getVectorLayer(
        function (feature){
          return {
            icon: endIcon,
            text: feature.getProperties().text
          };
        }
      );
      this.createSelect({
        style(feature) {
          return {
            icon: icon,
            text: feature.getProperties().text
          };
        },
        layers: [this.iconLayerEnd],
        callback(feature, info) {
          console.log(feature, info);
        }
      });
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

      this.dialog = this.createOverLayer(this.$refs.dialog, [0, 50]);
      this.dialog.setPosition([118.15364562988282, 24.507671026611323]);
      this.polygonLayer = this.getVectorLayer();
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
      let clusterList = [
        {
          lonLat: [118.18935119628907, 24.503551153564448],
          text: '100'
        },
        {
          lonLat: [118.19278442382813, 24.482951788330073],
          text: '222'
        },

      ];
      let clusterLayer = this.getClusterLayer((feature)=> {
        return {
          icon: icon,
          color: '#3399CC',
          text: feature.get('features')[0].getProperties().text
        };
      });
      this.showClusterPoints({layer: clusterLayer, list: clusterList});
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
    },
    closeDialog() {
      this.dialog.setPosition(null);
    }
  }
};
</script>

<style scoped lang="less">
.map-wrapper {
  position: relative;
}

.map {
  width: 100%;
  height: 100vh;
}

.dialog {
  color: #fff;
  background-color: #000;
}
</style>
