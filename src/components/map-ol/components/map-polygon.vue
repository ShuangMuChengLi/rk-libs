<!-- 多边形 -->
<template>
  <div />
</template>

<script>
import { Vector as SourceVector } from 'ol/source';
import { Feature } from 'ol';
import {Style, Stroke, Fill, Text} from 'ol/style';
import { Vector as LayerVector } from 'ol/layer';
import { Polygon } from 'ol/geom';
export default {
  name: 'MapPolygon',
  props: {
    pointList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    elementName: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    lineColor: {
      type: String,
      default: ''
    },
    lineWidth: {
      type: Number,
      default: 0
    },
    lineDash: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fillColor: {
      type :String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return{
      polygonLayer: null
    };
  },
  watch: {
    pointList:{
      handler () {
        this.MapPolygon();
      },
      deep: true
    },
    elementName:{
      handler () {
        this.MapPolygon();
      },
      deep: true
    },
    className:{
      handler () {
        this.MapPolygon();
      },
      deep: true
    },
    lineColor:{
      handler () {
        this.MapPolygon();
      },
      deep: true
    },
    lineWidth:{
      handler () {
        this.MapPolygon();
      },
      deep: true
    },
    lineDash:{
      handler () {
        this.MapPolygon();
      },
      deep: true
    },
    fillColor:{
      handler () {
        this.MapPolygon();
      },
      deep: true
    },
    zIndex:{
      handler(){
        this.MapPolygon();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.MapPolygon();
    });
  },
  methods: {
    MapPolygon() {
      const _that = this;
      // 清除原来的
      if(_that.polygonLayer){
        _that.polygonLayer.getSource().clear();
      }
      // 创建一个 source图层
      const source = new SourceVector();
      // 所有点共同构成一个 feature
      const feature = new Feature({
        name: _that.elementName || 'el-mapPolygon',
        geometry: new Polygon([this.pointList])
      });
      // 然后把feature添加到source里
      source.addFeature(feature);
      this.polygonLayer = new LayerVector({
        className: _that.className || 'map-polygon',
        source: source,
        zIndex: _that.zIndex || 200,
        style: function (feature, resolution) {
          const style = [
            new Style({
              stroke: new Stroke({
                color:  _that.lineColor || '#409eff',
                width: _that.lineWidth || 2,
                lineDash: _that.lineDash || null,
                lineDashOffset: 0
              }),
              //填充样式
              fill: new Fill({
                color: _that.fillColor || 'rgba(0,0,0,0.8)' //颜色、渐变或图案
              }),
              // 文本样式
              text: new Text({
                text: _that.elementName || null,
                fill: new Fill({
                  color: '#fff'
                }),
                font: '14px Microsoft YaHei'
              })
            })
          ];
          return style;
        }
      });
      this.$parent.$data.mapData.addLayer(this.polygonLayer);
    }
  },
  render() {
    return this.$parent.preventChildrenRender;
  }
};
</script>
