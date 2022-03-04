
import 'ol/ol.css';

// const View = ol.View;
import {Overlay, View} from 'ol';
// const Map = ol.Map;
import { Map } from 'ol';
// const controlDefault = ol.control.defaults;
import { defaults as controlDefault} from 'ol/control';
// const Tile = ol.layer.Tile;
import { Tile } from 'ol/layer';
// const VectorLayer = ol.layer.Vector;
import { Vector as VectorLayer} from 'ol/layer';
// const VectorSource = ol.source.Vector;
import { Vector as VectorSource} from 'ol/source';
// const XYZ = ol.source.XYZ;
import { XYZ } from 'ol/source';
// const Feature = ol.Feature;
import { Feature } from 'ol';
// const Point = ol.geom.Point;
import { Point } from 'ol/geom';
// const MultiLineString = ol.geom.MultiLineString;
import { MultiLineString } from 'ol/geom';
// const Icon = ol.style.Icon;
import { Icon } from 'ol/style';
// const Circle = ol.style.Circle;
import { Circle } from 'ol/style';
// const Fill = ol.style.Fill;
import { Fill } from 'ol/style';
// const Stroke = ol.style.Stroke;
import { Stroke } from 'ol/style';
// const Text = ol.style.Text;
import { Text } from 'ol/style';
// const Style = ol.style.Style;
import { Style } from 'ol/style';
// const Select = ol.interaction.Select;
import { Select } from 'ol/interaction';
// const boundingExtent = ol.extent.boundingExtent;
import { boundingExtent } from 'ol/extent';
import arrowImg from './images/mapLineArrow.png';
import startImg from './images/start.png';
import endImg from './images/end.png';
import {getDistance} from '../../../../js/map/point-distance/point-distance';
import _ from 'lodash';
import {click} from 'ol/events/condition';
export const mapCommonMixin = {
  data(){
    return {
      mapObj: null,
      mapView: null,
      coors: []
    };
  },
  mounted(){
    this.bus.$on('map-common:setCenter', this.setMapCenter);
    this.bus.$on('map-common:fitViewZoom', this.fitViewZoom);
  },
  beforeDestroy(){
    this.bus.$off('map-common:setCenter', this.setMapCenter);
    this.bus.$off('map-common:fitViewZoom', this.fitViewZoom);
  },
  methods: {
    /**
     *
     * @param options
     * {
        target: 'map',
        center: [118.12, 24.4869],
        url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f'
      }
     */
    initMap(options){
      // 瓦片图层
      let tile = new Tile({
        source: new XYZ({
          url: options.url || 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f'
        })
      });
      // 视图
      let center = options.center || [118.12, 24.4869];
      this.mapView = new View({
        center: center, // 地图中心
        zoom: 12, // 缩放级别
        maxZoom: 18,
        projection: 'EPSG:4326'
      });
      // 地图对象
      this.mapObj = new Map({
        target: options.target || 'map', // 容器
        layers: [tile], // 图层
        // 视图
        view: this.mapView,
        controls: controlDefault({
          zoom: false
        })
      });
      // 手势
      this.mapObj.on('pointermove', (evt) => {
        if(this.mapObj.hasFeatureAtPixel(evt.pixel)){
          this.mapObj.getTargetElement().style.cursor = 'pointer';
        }else{
          this.mapObj.getTargetElement().style.cursor = '';
        }
      });
      this.mapObj.on('click', (e)=>{
        let eventData = this.getEventData(e);
        // console.log(eventData.coors);
      });
      return this.mapObj;
    },
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
    getEventData(evt){
      let mapObject = this.mapObj;
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
    getLonLat(item){
      let lonLat;
      if(item.lonLat){
        lonLat = item.lonLat;
      }else if(item.lon){
        lonLat = [item.lon, item.lat];
      }else if(item.longitude){
        lonLat = [item.longitude, item.latitude];
      }else if(item.Longitude){
        lonLat = [item.Longitude, item.Latitude];
      }else if(item.x){
        lonLat = [item.x, item.y];
      }

      lonLat = [Number(lonLat[0]), Number(lonLat[1])];
      if(_.isNaN(lonLat[0]) || _.isNaN(lonLat[1]))return null;

      return lonLat;
    },
    getFeaturesStyle(item){
      if(!item.icon && !item.text && !item.zIndex)return null;

      let styleOption = {};
      if(item.icon){
        styleOption.image = new Icon({
          src: item.icon,
          anchor: [0.5, 0.5],
        });
      }
      if(item.text){
        styleOption.text = new Text({
          font: '13px sans-serif',
          text: item.text,
          textAlign: 'center',
          offsetY: 30,
          // offsetX: 'center',
          fill: new Fill({ color: '#4a4af5'}),
        });
      }
      if(item.zIndex){
        styleOption.zIndex = item.zIndex;
      }
      return new Style(styleOption);
    },
    /**
     *
     * @param item
     * @returns {*}
     */
    getFeature(item){
      let coor = this.getLonLat(item);
      if(!coor)return;

      let feature = new Feature({
        geometry: new Point(coor),
      });
      let featureStyle = this.getFeaturesStyle(item);
      feature.setStyle(featureStyle);
      feature.setProperties(item);
      if(item.id){
        feature.setId(item.id);
      }
      return feature;
    },

    /**
     *
     * @param layer
     * @param item
     * {
     *   icon 可选
     *   text 可选
     * }
     */
    showPoint(layer, item){
      let feature = this.getFeature(item);
      layer.getSource().addFeature(feature);
    },
    /**
     *
     * @param layer
     * @param list
     */
    showPoints(layer, list){
      let featureList = [];
      for(let item of list){
        let feature = this.getFeature(item);
        if(!feature){
          console.error('showPoints item continue:', item);
          continue;
        }

        featureList.push(feature);
      }
      layer.getSource().addFeatures(featureList);
    },
    clearLayer(layer){
      layer?.getSource().clear();
    },
    /**
     * 移动到地图中心
     */
    loadCenter(coor) {
      this.mapView.animate(
        {
          center: coor,
          duration: 500,
          zoom: 12
        },
        {
          center: coor,
          duration: 500,
          zoom: 15
        }
      );
    },
    setMapCenter(coor, hasAnimate) {
      let lonLat = [Number(coor[0]), Number(coor[1])];
      if(hasAnimate){
        this.mapView.animate({
          center: lonLat,
          duration: 800,
          zoom: 15
        });
      }else{
        this.mapView.setCenter(lonLat);
      }
    },
    getVectorLayer(styleOption){
      let vector = new VectorLayer({
        source: new VectorSource()
      });
      this.mapObj.addLayer(vector);
      if(styleOption){
        let featureStyle = this.getFeaturesStyle(styleOption);
        if(featureStyle){
          vector.setStyle(featureStyle);
        }
      }else{
        vector.setStyle((feature)=>{
          return feature.get('style');
        });
      }
      return vector;
    },
    createSelect(option = {}){
      let select = new Select({
        ...option,
        style: this.getFeaturesStyle(option)
      });
      select.on('select', (e) => {
        // console.log(e);
        if(option.callback && e.selected.length){
          option.callback(e.selected, e.selected[0].getProperties());
        }
      });
      this.mapObj.addInteraction(select);
      return select;
    },
    drawLine(linePoints, layer){
      layer.getSource().clear();
      let style = this.getLineStyle(linePoints);
      layer.setStyle(style);
      let feature = new Feature({
        geometry: new MultiLineString([linePoints])
      });
      layer.getSource().addFeature(feature);
      this.fitViewZoom(linePoints);
    },
    getLineStyle(linePoints) {
      let lineStyleArr = [
        new Style({
          stroke: new Stroke({
            width: 15,
            color: '#5ecb71'
            // borderImage: 'linear-gradient(red, blue)'
          }),
          zIndex: 1
        })
      ];

      lineStyleArr.push(new Style({
        geometry: new Point(linePoints[0]),
        image: new Icon({
          src: startImg,
          anchor: [0.5, 0.5],
        }),
        zIndex: 9
      }));
      for (let i = 0; i < linePoints.length - 1; i++) {
        let startPoint = linePoints[i];
        let endPoint = linePoints[i + 1];

        let distance = getDistance(...startPoint, ...endPoint);
        if(distance > 1){
          const stepLon = (endPoint[0] - startPoint[0]) / 2;
          const stepLat = (endPoint[1] - startPoint[1]) / 2;
          const arrowPoint = [startPoint[0] + stepLon, startPoint[1] + stepLat];
          const rotation = Math.atan2(stepLon, stepLat);
          lineStyleArr.push(new Style({
            geometry: new Point(arrowPoint),
            image: new Icon({
              src: arrowImg,
              anchor: [.5, .5],
              rotateWithView: false,
              rotation: rotation
            }),
            zIndex: 1
          }));
        }
        if(i === linePoints.length - 2){
          lineStyleArr.push(new Style({
            geometry: new Point(endPoint),
            image: new Icon({
              src: endImg,
              anchor: [0.5, 0.5],
            }),
            zIndex: 9
          }));
        }else{
          lineStyleArr.push(new Style({
            geometry: new Point(endPoint),
            fill: new Fill({
              color: 'rgba(204,65,65,0.2)'
            }),
            stroke: new Stroke({
              width: 10,
              color: '#ff3030'
            }),
            image: new Circle({
              radius: 10,
              fill: new Fill({
                color: '#569ef7'
              }),
              stroke: new Stroke({
                width: 3,
                color: '#fff'
              })
            }),
            zIndex: 5
          }));
        }

      }
      return lineStyleArr;
    },
    fitViewZoom(pointList) {
      pointList = pointList.filter((item)=>{
        return item[0] || item[1];
      });
      let length = pointList.length;
      if (length <= 0) {
        return;
      }
      let view = this.mapObj.getView();
      let extent = boundingExtent(pointList);
      let size = this.mapObj.getSize();
      view.fit(extent, size, {
        constrainResolution: false,
        nearest: true
      });
      let zoom = view.getZoom() || 18;
      if(zoom < 12){
        zoom = 12;
      }
      zoom -= 0.5;
      view.setZoom(zoom);
    },
    createOverLayer(ref, offset){
      let overlay = new Overlay({
        element: ref,
        autoPan: true,
        offset: offset,
        positioning: 'center-left',
        autoPanAnimation: {
          duration: 250
        }
      });
      this.mapObj.addOverlay(overlay);
      return overlay;
    },
  }
};
