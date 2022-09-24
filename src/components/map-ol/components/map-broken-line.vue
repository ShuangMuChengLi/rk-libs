<!-- 折线组件 -->
<template>
  <div />
</template>

<script>
import { Vector as SourceVector } from 'ol/source';
import { Feature } from 'ol';
import {Style, Stroke, Text, Fill} from 'ol/style';
import { Vector as LayerVector } from 'ol/layer';
import { LineString } from 'ol/geom';
export default {
  name: 'MapBrokenLine',
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
      default: () => {
        return 0;
      }
    },
    lineDash: {
      type: Array,
      default: () => {
        return [];
      }
    },
    zIndex: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  data() {
    return {
      lineStringLayer: null
    };
  },
  watch: {
    pointList:{
      handler () {
        this.MapLineString();
      },
      deep: true
    },
    elementName:{
      handler () {
        this.MapLineString();
      },
      deep: true
    },
    className:{
      handler () {
        this.MapLineString();
      },
      deep: true
    },
    lineColor:{
      handler () {
        this.MapLineString();
      },
      deep: true
    },
    lineDash:{
      handler () {
        this.MapLineString();
      },
      deep: true
    },
    lineWidth:{
      handler () {
        this.MapLineString();
      },
      deep: true
    },
    zIndex:{
      handler(){
        this.MapLineString();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.MapLineString();
    });
  },
  methods: {
    MapLineString() {
      const _that = this;
      // 清除原来的
      if(_that.lineStringLayer) {
        _that.lineStringLayer.getSource().clear();
      }
      // 创建一个source图层
      const vectorSource = new SourceVector();
      // 所有点共同构成一个feature
      const feature = new Feature({
        name: _that.elementName || null,
        geometry: new LineString(this.pointList)
      });
      // 然后把feature添加到source
      vectorSource.addFeature(feature);
      _that.lineStringLayer = new LayerVector({
        className: _that.className || 'map-line-string',
        source: vectorSource,
        zIndex: _that.zIndex || 300,
        style: function (feature, resolution) {
          const style = [
            new Style({
              stroke: new Stroke({
                color: _that.lineColor || '#409eff',
                width: _that.lineWidth || 2,
                lineDash: _that.lineDash || null,
                lineDashOffset: 0
              }),
              // 文本样式
              text: new Text({
                text: _that.elementName || null,
                fill: new Fill({
                  color: '#fff'
                }),
                font: '14px Microsoft YaHei',
                offsetX: 0,
                offsetY: 0,
                padding:[ 2, 10, 0, 10],
                // 文本边框
                backgroundStroke: new Stroke({
                  color: '#f00',
                  width: 1
                }),
                // 文本填充
                backgroundFill: new Fill({
                  color:'rgba(0,0,0,0.5)'
                })
              })
            })
          ];
          return style;
        }
      });
      _that.$parent.$data.mapData.addLayer(_that.lineStringLayer);
    }
  },
  render() {
    return this.$parent.preventChildrenRender;
  }
};
</script>
