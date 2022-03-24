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
    var map = L.map('map').setView([24.498298, 118.144153], 13);
    L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f').addTo(map);
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
