<!-- 圆形 -->
<template>
  <div />
</template>

<script>
import { Vector as SourceVector, Cluster } from 'ol/source';
import { Feature } from 'ol';
import { Circle } from 'ol/geom';
import { Stroke, Style, Icon, Fill, Text } from 'ol/style';
import { Vector as LayerVector } from 'ol/layer';
export default {
  name: 'MapCircle',
  props: {
    position: {
      type: Array,
      default: () => {
        return [];
      }
    },
    radius: {
      type: Number,
      default: 0
    },
    elementName: {
      type: String,
      default: () => {
        return 0;
      }
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
  data(){
    return {
      circleLayer: null
    };
  },
  watch:{
    position:{
      handler () {
        this.MapCircle();
      },
      deep: true
    },
    radius:{
      handler () {
        this.MapCircle();
      },
      deep: true
    },
    elementName:{
      handler () {
        this.MapCircle();
      },
      deep: true
    },
    className:{
      handler () {
        this.MapCircle();
      },
      deep: true
    },
    lineColor:{
      handler () {
        this.MapCircle();
      },
      deep: true
    },
    lineWidth:{
      handler () {
        this.MapCircle();
      },
      deep: true
    },
    lineDash:{
      handler () {
        this.MapCircle();
      },
      deep: true
    },
    fillColor:{
      handler () {
        this.MapCircle();
      },
      deep: true
    },
    zIndex:{
      handler(){
        this.MapCircle();
      }
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.MapCircle();
    });
  },
  methods:{
    // 圆形叠加图层
    MapCircle() {
      const _that = this;
      if (_that.circleLayer) {
        _that.circleLayer.getSource().clear();
      }
      // 圆的半径换算
      let metersPerUnit = _that.$parent.$data.mapData.getView().getProjection().getMetersPerUnit();
      let circleRadius = ( _that.radius || 100) / metersPerUnit;
      // 创建矢量容器
      const centerRadius = new Circle(_that.position, circleRadius);
      const vectorSource = new SourceVector({});
      //创建图标特性
      const circleFeature = new Feature({
        type: 'mapCircle',
        name: _that.elementName || 'el-mapCircle',
        geometry: centerRadius
      });
      // 图标特性添加到矢量容器
      vectorSource.addFeature(circleFeature);
      //创建矢量层
      _that.circleLayer = new LayerVector({
        className: _that.className || 'map-circle',
        source: vectorSource,
        zIndex: _that.zIndex || 200,
        //创建圆的样式
        style: new Style({
          stroke: new Stroke({
            color:  _that.lineColor || '#409eff',
            width: _that.lineWidth || 2,
            lineDash: _that.lineDash || null,
            lineDashOffset: 0
          }),
          //填充样式
          fill: new Fill({
            color: _that.fillColor || 'rgba(255,255,255,0.5)' // 颜色、渐变或图案
          }),
          // 文本样式
          text: new Text({
            text: _that.elementName || null,
            fill: new Fill({
              color: '#333'
            }),
            font: '14px Microsoft YaHei'
          })
        })
      });
      _that.$parent.$data.mapData.addLayer(_that.circleLayer);
    }
  },
  render () {
    return this.$parent.preventChildrenRender;
  }
};
</script>
