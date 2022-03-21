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
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import mapJSON from './100000_full.json';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import Point from 'ol/geom/Point';
import img from '../../../../views/test/icon.png';
export default {
  name: 'OlLoadJson',
  mounted () {
    // const osm = new TileLayer({
    //   source: new OSM(),
    // });

    const aerial = new TileLayer({
      source: new XYZ({
        url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f',
        maxZoom: 20,
        tileSize: 512,
      }),
    });
    const map = new Map({
      layers: [ aerial],
      target: 'map',
      view: new View({
        center: [118.144153, 24.498298],
        zoom: 5,
        projection: 'EPSG:4326'
      }),
    });

    const image = new CircleStyle({
      radius: 5,
      fill: null,
      stroke: new Stroke({color: 'red', width: 1}),
    });

    const styles = {
      'Point'(feature){
        return new Style({
          // image: new Icon({
          //   anchor: [0.5, 0.96],
          //   crossOrigin: 'anonymous',
          //   src: src,
          // }),
          text: new Text({
            text: feature.getProperties().text,
            font: '12px sans-serif',
            textAlign: 'center',
            textBaseline: 'middle',
            backgroundFill: new Fill({
              color: '#3399cc'
            }),
            fill: new Fill({
              color: '#fff'
            })
          })
        });
      },
      'LineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      'MultiLineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      'MultiPoint': new Style({
        image: image,
      }),
      'MultiPolygon': new Style({
        stroke: new Stroke({
          color: 'yellow',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
      'Polygon': new Style({
        stroke: new Stroke({
          color: 'yellow',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
      'GeometryCollection': new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2,
        }),
        fill: new Fill({
          color: 'magenta',
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta',
          }),
        }),
      }),
      'Circle': new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)',
        }),
      }),
    };

    const styleFunction = function (feature) {
      if(feature.getGeometry().getType() !== 'Point'){
        return styles[feature.getGeometry().getType()];
      }else{
        return styles[feature.getGeometry().getType()](feature);
      }

    };

    const geojsonObject = mapJSON;

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
    });

    for(let item of mapJSON.features){
      if(!item || !item.properties || !item.properties.center){
        continue;
      }
      const iconFeature = new Feature(new Point(item.properties.center));
      iconFeature.setProperties({
        text: item.properties.name
      });
      vectorSource.addFeature(iconFeature);
    }
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
    });
    map.addLayer(vectorLayer);

  }
};
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 90vh;
}
</style>
