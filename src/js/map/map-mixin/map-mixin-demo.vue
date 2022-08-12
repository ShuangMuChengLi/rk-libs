<template>
  <div class="map-wrapper">
    <div class="button-wrapper">
      <el-select
        v-model="drawType"
        size="mini"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        @click="startDraw"
      >
        绘制
      </el-button>
      <el-button
        type="primary"
        @click="stopDraw(drawer)"
      >
        停止绘制
      </el-button>
      <el-button
        type="primary"
        @click="showDialogBtn"
      >
        弹窗
      </el-button>
    </div>
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
import t from './t.json';
export default {
  name: 'OlDemo',
  mixins: [mapCommonMixin],
  data(){
    return {
      drawType: '',
      drawer: null,
      options:[
        {
          label: 'Point',
          value: 'Point',
        },
        {
          label: 'LineString',
          value: 'LineString',
        },
        {
          label: 'Polygon',
          value: 'Polygon',
        },
        {
          label: 'Circle',
          value: 'Circle',
        },
        {
          label: 'None',
          value: 'None',
        },
      ],
      map: null
    };
  },
  mounted() {
    this.map = this.initMap({
      target: 'map',
      center: [118.12, 24.4869],
      url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f'
    });
    this.clickLayer = this.getVectorLayer({
      icon: icon,
      anchor: [0.5, 1]
    });
    this.addMapEventListener('mapClick', (data, lonLat)=>{
      console.log(lonLat);
      // this.clearLayer(this.clickLayer);
      // this.showPoint(
      //   {
      //     layer: this.clickLayer,
      //     item: {
      //       lon: lonLat[0],
      //       lat: lonLat[1],
      //     },
      //   }
      // );
    });
    this.initLayers();
  },
  methods: {
    initLayers() {
      this.polygonLayer = this.getVectorLayer();
      this.showPolygon({
        layer: this.polygonLayer,
        text: [''],
        list: [
          t
        ]
      });
      console.log(t);
      return;
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
      this.lineLayer = this.getVectorLayer();
      this.drawLine([
        [118.2266017150879, 24.560886053466792],
        [118.24514114379883, 24.439006475830073],
        [118.16205703735352, 24.402270941162104]
      ], this.lineLayer);
      this.drawVector = this.getVectorLayer();
    },
    showDialogBtn(){
      let center = this.map.getView().getCenter();
      this.showDialog({
        lonLat: center,
        dialogSize: [400, 400]
      });

    },
    showDialog(option){
      this.dialog = this.createOverLayer(this.$refs.dialog, [- option.dialogSize[0] / 2, - option.dialogSize[1]]);
      this.dialog.setPosition(option.lonLat);
      this.showPoint(
        {
          layer: this.iconLayer,
          item: {
            lonLat: option.lonLat,
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
      this.setMapCenter({lonLat: option.lonLat, offset:[0, option.dialogSize[1] / 2]});
    },
    closeDialog() {
      this.dialog.setPosition(null);
    },
    startDraw(){
      this.drawer = this.draw({
        layer: this.drawVector,
        type: this.drawType
      });
    }
  }
};
</script>

<style scoped lang="less">
.map-wrapper {
  position: relative;
  .button-wrapper{
    position: absolute;
    top: 100px;
    left: 100px;
    z-index: 999;
  }
}

.map {
  width: 100%;
  height: 100vh;
}

.dialog {
  color: #333;
  background-color: #fff;
  width: 400px;
  height: 400px;
}
</style>
