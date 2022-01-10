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
import {Icon, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Heatmap from 'ol/layer/Heatmap';
export default {
  name: 'OlDemo',
  mounted () {
    const extent = [0, 0, 1024, 968];
    const projection = new Projection({
      units: 'pixels',
      extent: extent,
    });
    const layer = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: new VectorSource(),
    });
    const map = new Map({
      layers: [
        new ImageLayer({
          source: new Static({
            url: pictureMap,
            projection: projection,
            imageExtent: extent,
          }),
        }),
        layer
      ],
      target: 'map',
      view: new View({
        projection: projection,
        center: getCenter(extent),
        zoom: 2,
        maxZoom: 8,
      })
    });
    function createStyle(src, img) {
      return new Style({
        image: new Icon({
          anchor: [0.5, 0.96],
          crossOrigin: 'anonymous',
          src: src,
          img: img,
          imgSize: img ? [img.width, img.height] : undefined,
        }),
      });
    }

    const iconFeature = new Feature(new Point([500, 500]));
    iconFeature.set('style', createStyle(imgIcon, undefined));
    iconFeature.setProperties({
      test: 1
    });
    layer.getSource().addFeature(iconFeature);
    let f;
    map.on('click', (e)=>{
      const eventData = this.getEventData(map, e);
      if(eventData.hasFeature){
        f = eventData.features[0];
        f.set('style', createStyle(imgActiveIcon, undefined));
        f.getGeometry().setCoordinates([100, 100]);
      }else{
        if(f){
          f.set('style', createStyle(imgIcon, undefined));
          f.getGeometry().setCoordinates([500, 500]);
        }
      }
    });
    const vector = new Heatmap({
      source: new VectorSource(),
      // gradient: ['#000', '#fff'],
      blur: 25, // 模糊半径
      radius: 20, //半径
      weight(feature){
        return Math.random();
      }
    });
    for(let i = 0; i < 10 ; i++){
      const heatFeature = new Feature(new Point([300 + i * 50, 500 + i * 50]));
      vector.getSource().addFeature(heatFeature);
    }
    map.addLayer(vector);

    // let select = new Select();
    // map.addInteraction(select);
    // select.on('select', (e) => {
    //   let features = e.target.getFeatures().getArray();
    //   console.log(features);
    //   if (features.length > 0) {
    //     let feature = features[0];
    //     console.log(feature.getProperties());
    //   }
    // });
  },
  methods:{
    /**
     * 加工事件数据
     * @return :
     * {
        features,
        coors,
        flag,
        properties
      }
     * */
    getEventData(mapObject, evt){
      let features = mapObject.getFeaturesAtPixel(evt.pixel);
      let coors = mapObject.getCoordinateFromPixel(evt.pixel);
      let hasFeature = mapObject.hasFeatureAtPixel(evt.pixel);
      let properties = null;
      if (features && features.length) {
        properties = features[0].getProperties();
      }
      return {
        features,
        coors,
        hasFeature,
        properties
      };
    },
  }
};
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 100vh;
}
</style>
