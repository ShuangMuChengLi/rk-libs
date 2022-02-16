<template>
  <div>
    <div
      id="map"
      class="map"
    />
  </div>
</template>

<script>
import 'ol/ol.css';
import ImageLayer from 'ol/layer/Image';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import pictureMap from '../../images/online_communities.png';
import imgIcon from '../../images/track-car.png';
import imgActiveIcon from '../../images/track-car-active.png';
import {Fill, Icon, Style, Text} from 'ol/style';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Heatmap from 'ol/layer/Heatmap';
import img from './icon.png';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
export default {
  name: 'OlLoadJson',
  mounted() {

    const aerial = new TileLayer({
      source: new XYZ({
        url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f',
        maxZoom: 20,
        tileSize: 512,
      }),
    });
    const map = new Map({
      layers: [aerial],
      target: 'map',
      view: new View({
        center: [118.144153, 24.498298],
        zoom: 13,
        projection: 'EPSG:4326'
      }),
    });
    const layer = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: new VectorSource(),
    });
    map.addLayer(layer);
    function createStyle(src, img) {
      return new Style({
        // image: new Icon({
        //   anchor: [0.5, 0.96],
        //   crossOrigin: 'anonymous',
        //   src: src,
        // }),
        text: new Text({
          text: '11111111',
          font: '20px sans-serif',
          textAlign: 'center',
          textBaseline: 'bottom',
          backgroundFill: new Fill({
            color: '#3399cc'
          }),
          fill: new Fill({
            color: '#fff'
          })
        })
      });
    }

    const iconFeature = new Feature(new Point([118.144153, 24.498298],));
    iconFeature.set('style', createStyle(img, undefined));
    iconFeature.setProperties({
      test: 1
    });
    layer.getSource().addFeature(iconFeature);
  }
};
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 90vh;
}
</style>
