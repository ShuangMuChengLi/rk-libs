<template>
  <div>
    <div
      id="map"
      class="map"
    />
    <input
      id="swipe"
      type="range"
      style="width: 100%"
    >
  </div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {getRenderPixel} from 'ol/render';
import { fromLonLat } from 'ol/proj';

export default {
  name: 'OlDemo',
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


    const aerial2 = new TileLayer({
      source: new XYZ({
        url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=8af93e179c7846049f1a716c9c0a48a0',
        maxZoom: 20,
      }),
    });

    const map = new Map({
      layers: [ aerial, aerial2],
      target: 'map',
      view: new View({
        center: fromLonLat([118.144153, 24.498298]),
        zoom: 13,
      }),
    });

    const swipe = document.getElementById('swipe');

    aerial2.on('prerender', function (event) {
      const ctx = event.context;
      const mapSize = map.getSize();
      const width = mapSize[0] * (swipe.value / 100);
      const tl = getRenderPixel(event, [width, 0]);
      const tr = getRenderPixel(event, [mapSize[0], 0]);
      const bl = getRenderPixel(event, [width, mapSize[1]]);
      const br = getRenderPixel(event, mapSize);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tl[0], tl[1]);
      ctx.lineTo(bl[0], bl[1]);
      ctx.lineTo(br[0], br[1]);
      ctx.lineTo(tr[0], tr[1]);
      ctx.closePath();
      ctx.clip();
    });

    aerial2.on('postrender', function (event) {
      const ctx = event.context;
      ctx.restore();
    });

    const listener = function () {
      map.render();
    };
    swipe.addEventListener('input', listener);
    swipe.addEventListener('change', listener);
  }
};
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 90vh;
}
</style>
