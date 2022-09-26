<!-- 曲线组件 -->
<template>
  <div />
</template>

<script>
import smooth from 'chaikin-smooth';
import { Vector as SourceVector, Cluster } from 'ol/source';
import { Feature } from 'ol';
import {Style, Stroke, Fill, Text} from 'ol/style';
import { Vector as LayerVector } from 'ol/layer';
import { LineString } from 'ol/geom';
export default {
  name: 'MapSmoothLine',
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
        geometry: new LineString(this.makeSmooth(this.pointList, 10))
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
              })
            })
          ];
          return style;
        }
      });
      _that.$parent.$data.mapData.addLayer(_that.lineStringLayer);
    },
    /**
     * 生成平滑的点
     * @param path
     * @param numIterations
     * @returns {*}
     */
    makeSmooth(path, numIterations) {
      numIterations = Math.min(Math.max(numIterations, 1), 10);
      while (numIterations > 0) {
        path = smooth(path);
        numIterations--;
      }
      return path;
    }
  },
  render() {
    return this.$parent.preventChildrenRender;
  }
};
</script>
