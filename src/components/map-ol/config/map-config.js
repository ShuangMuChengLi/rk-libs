import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ, TileArcGISRest } from 'ol/source';
// const mapType = 2;
// 0 = 部署的离线瓦片地图，1 = osm，2 = Arcgis在线午夜蓝地图服务
const streetMap = function(mapType) {
  let mapLayer = null;
  switch(mapType) {
  case 0:
    mapLayer = new TileLayer({
      source: new XYZ({
        url: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png'
      })
    });
    break;
  case 1:
    mapLayer = new TileLayer({
      source: new OSM()
    });
    break;
  case 2:
    mapLayer = new TileLayer({
      source:new TileArcGISRest({
        // url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer' // 午夜蓝停用了
        url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'
      })
    });
    break;
  }
  return [mapLayer];
};

const mapConfig = {
  streetMap: streetMap
};

export default mapConfig;
