<template>
  <div
    id="map"
    class="map"
  />
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
export default {
  name: 'Leaflet',
  mounted(){
    let point = [24.498298, 118.144153];
    var map = L.map('map').setView(point, 13);
    L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f').addTo(map);
    var greenIcon = L.icon({
      iconUrl: 'logo.png',
      iconSize:     [600 / 5, 157 / 5], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var marker = L.marker(point, {icon: greenIcon}).addTo(map);
  }
};
</script>

<style scoped lang="less">
.map{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
