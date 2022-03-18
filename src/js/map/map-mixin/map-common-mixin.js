// const View = ol.View;
// const Map = ol.Map;
// const Feature = ol.Feature;
// const controlDefault = ol.control.defaults;
// const Tile = ol.layer.Tile;
// const VectorLayer = ol.layer.Vector;
// const VectorSource = ol.source.Vector;
// const XYZ = ol.source.XYZ;
// const Point = ol.geom.Point;
// const MultiLineString = ol.geom.MultiLineString;
// const Icon = ol.style.Icon;
// const Circle = ol.style.Circle;
// const Fill = ol.style.Fill;
// const Stroke = ol.style.Stroke;
// const Text = ol.style.Text;
// const Style = ol.style.Style;
// const Select = ol.interaction.Select;
// const boundingExtent = ol.extent.boundingExtent;
import 'ol/ol.css';
import {Feature, Map, Overlay, View} from 'ol';
import {defaults as controlDefault} from 'ol/control';
import {Tile, Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource, XYZ} from 'ol/source';
import {Circle, Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {Select} from 'ol/interaction';
import {LineString, MultiLineString, Point} from 'ol/geom';
import {boundingExtent, getCenter} from 'ol/extent';
import arrowImg from './images/mapLineArrow.png';
import startImg from './images/start.png';
import endImg from './images/end.png';
import {getDistance} from './point-distance/point-distance';
import _ from 'lodash';
import GeoJSON from 'ol/format/GeoJSON';
import Cluster from 'ol/source/Cluster';
import CircleStyle from 'ol/style/Circle';
import Draw, {createBox} from 'ol/interaction/Draw';

export const mapCommonMixin = {
  data(){
    return {
      mapObj: null,
      mapView: null,
      PolygonStyle: function (feature) {
        return [
          new Style({
            stroke: new Stroke({
              color: 'yellow',
              width: 1,
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 0, 0.1)',
            }),
          }),
          new Style({
          // image: new Icon({
          //   anchor: [0.5, 0.96],
          //   crossOrigin: 'anonymous',
          //   src: src,
          // }),
            text: new Text({
              text: feature.getProperties().text,
              font: 'normal bold 18px/30px sans-serif',
              textBaseline: 'middle',
              padding: [0, 5, 0, 5],
              textAlign: 'center',
              backgroundFill: new Fill({
                color: '#3399cc'
              }),
              fill: new Fill({
                color: '#fff'
              })
            })
          })
        ];
      },
      eventSet:{}
    };
  },
  methods: {
    addMapEventListener(eventName, callback){
      if(!this.eventSet[eventName]){
        this.eventSet[eventName] = [];
      }
      this.eventSet[eventName].push(callback);
    },
    triggerEvent(eventName, ...data){
      if(!_.isEmpty(this.eventSet[eventName])){
        for(let item of this.eventSet[eventName]){
          item(...data);
        }
      }
    },
    /**
     * 初始化地图
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
        this.triggerEvent('mapClick', eventData, eventData.lonLat);
      });
      return this.mapObj;
    },
    /**
     * 显示单个点位
     * @param options
     * {
     *   item, // 含经纬度的点位信息
     *   style, //  style {Function | Object}  {text，zIndex， icon}
     *   layer  // 图层
     * }
     */
    showPoint(options){
      let feature = this.getFeature(options.item, options.style);
      options.layer.getSource().addFeature(feature);
    },
    /**
     * 显示多个点位
     * @param option
     * * {
     *   list, // 含经纬度的点位数组
     *   style, //  style {Function | Object}  {text，zIndex， icon}
     *   layer  // 图层
     * }
     */
    showPoints(option){
      let featureList = [];
      for(let item of option.list){
        let feature = this.getFeature(item, option.style);
        if(!feature){
          console.error('showPoints item continue:', item);
          continue;
        }

        featureList.push(feature);
      }
      option.layer.getSource().addFeatures(featureList);
    },
    /**
     * 显示聚合点位
     * @param options
     * {
     *   list, // 含经纬度的点位数组
     *   layer  // 图层
     * }
     */
    showClusterPoints(options){
      let featureList = [];
      for(let item of options.list){
        let feature = this.getFeature(item);
        if(!feature){
          console.error('showPoints item continue:', item);
          continue;
        }

        feature.setProperties(item);
        if(item.id){
          feature.setId(item.id);
        }
        featureList.push(feature);
      }
      options.layer.getSource().getSource().addFeatures(featureList);
    },
    /**
     * 清空图层
     * @param layer
     */
    clearLayer(layer){
      layer?.getSource().clear();
    },
    /**
     * 设置中心点、层级
     * @param option
     * {
     *   hasAnimate,
     *   zoom,
     *   lonLat
     * }
     */
    setMapCenter(option) {
      if(!option || !option.lonLat && !option.zoom)return;

      if(option.hasAnimate){
        let animateOption = {
          duration: 800,
        };
        if(option.lonLat){
          animateOption.center = [Number(option.lonLat[0]), Number(option.lonLat[1])];
        }

        if(option.zoom){
          animateOption.center = option.zoom;
        }
        this.mapView.animate(animateOption);
        return;
      }

      if(option.lonLat){
        let lonLat = [Number(option.lonLat[0]), Number(option.lonLat[1])];
        this.mapView.setCenter(lonLat);
      }

      if(option.zoom){
        this.mapView.setZoom(option.zoom);
      }
    },
    /**
     * 新建图层
     * @param styleOption （Function|Object)
     * {text，zIndex， icon}
     * @returns VectorLayer
     */
    getVectorLayer(styleOption){
      let vector = new VectorLayer({
        source: new VectorSource()
      });
      this.mapObj.addLayer(vector);
      if(styleOption){
        vector.setStyle((feature)=>{
          return this.getFeaturesStyle(styleOption, feature);
        });
      }
      return vector;
    },
    /**
     * 新建聚合图层
     * @param styleOption
     * {
     *   color,
     *    icon,
     *    text
     * }
     * @returns VectorLayer
     */
    getClusterLayer(styleOption){
      const source = new VectorSource();
      const clusterSource = new Cluster({
        distance: 100,
        source: source,
      });
      let layer = new VectorLayer({
        source: clusterSource,
        style:(feature)=>{
          let featureStyle = this.getFeaturesStyle(styleOption, feature);
          let style;
          const styleCache = {
            '1': featureStyle
          };
          style = this.getClusterStyle({
            styleCache: styleCache,
            styleOption: styleOption
          })(feature);
          return style;
        }
      });
      this.mapObj.addLayer(layer);
      return layer;
    },
    /**
     * 新建Select
     * @param option
     * {
     *   layers,
     *   style,
     *   isCluster,
     *   callback
     * }
     * @returns Select
     */
    createSelect(option = {}){
      let select = new Select({
        layers: option.layers,
        style:(feature)=>{
          let featureStyle = this.getFeaturesStyle(option.style, feature);
          let style;
          if(option.isCluster){
            const styleCache = {
              '1': featureStyle
            };
            style = this.getClusterStyle({
              styleCache: styleCache,
              styleOption: option?.style
            })(feature);
          }else{
            style = featureStyle;
          }
          return style;
        }
      });
      select.on('select', (e) => {
        // console.log(e);
        if(option.callback && e.selected.length){
          if(option.isCluster){
            let infoList = [];
            for(let item of e.selected[0].get('features')){
              infoList.push(item.getProperties());
            }
            option.callback(e.selected[0], infoList);
          }else{
            option.callback(e.selected[0], e.selected[0].getProperties());
          }

        }
      });
      this.mapObj.addInteraction(select);
      return select;
    },
    /**
     * 画箭头
     * @param linePoints
     * @param layer
     */
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
    /**
     * 根据列表，适配地图层级和范围
     * @param pointList
     */
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
    /**
     * 新建addOverlay弹窗
     * @param ref
     * @param offset
     * @returns addOverlay
     */
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
    /**
     * 显示网格
     * @param options
     * {
     *   layer，
     *   list
     * }
     */
    showPolygon(options){
      let layer = options.layer;
      let list = options.list;
      const geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:4326',
          },
        },
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': list,
            },
          },
        ],
      };
      layer.getSource().addFeatures(new GeoJSON().readFeatures(geojsonObject));
      if(!_.isEmpty(options.text)){
        for(let i = 0; i < list.length; i++){
          let center = this.getPolygonCenter(list[i]);
          const iconFeature = new Feature(new Point(center));
          iconFeature.setProperties({
            text: options.text[i]
          });
          layer.getSource().addFeature(iconFeature);
        }
      }
      layer.setStyle(this.PolygonStyle);
    },
    /**
     * 获取多边形中心点
     * @param list
     * @returns {*}
     */
    getPolygonCenter(list){
      let geometry = new LineString(list);
      let extent = geometry.getExtent();
      return getCenter(extent);
    },
    stopDraw(drawer){
      if(drawer){
        this.mapObj.removeInteraction(drawer);
      }
    },
    /**
     *
     * @param options
     * {
     *   type,
     *   layer
     * }
     * @returns {Draw}
     */
    draw(options){
      let geometryFunction,
        type = options.type,
        layer = options.layer,
        freehand = options.freehand || false;
      let drawSource = layer.getSource();
      if(options.type === 'box'){
        geometryFunction = createBox();
        type = 'Circle';
      }
      let drawer = new Draw({
        source: drawSource,
        type,
        freehand,
        geometryFunction
      });
      drawer.on('drawstart', (e)=> {
        drawSource.clear();
      });
      drawer.on('drawend', (e)=> {
        let result = this.getDrawResult(e.feature, options.type);
        this.$emit('showStatistics', {
          drawerArg: result,
          drawerType: options.type,
        });
      });
      this.mapObj.addInteraction(drawer);
      return drawer;
    },
    /****************************内部函数**************************************/
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
      let lonLat = mapObject.getCoordinateFromPixel(evt.pixel);
      let hasFeature = mapObject.hasFeatureAtPixel(evt.pixel);
      let properties = null;
      if (features && features.length) {
        properties = features[0].getProperties();
      }
      return {
        features,
        lonLat,
        hasFeature,
        properties
      };
    },
    /**
     * 获取 item中可能的经纬度数组
     * @param item
     * @returns {null|number[]}
     */
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
    /**
     *
     * @param style {Function | Object}
     * {
     *   text,
     *   zIndex,
     *   icon,
     *   anchor,
     * }
     * @param feature
     * @returns {null|Style}
     */
    getFeaturesStyle(style, feature){
      let item;
      if(_.isFunction(style)){
        item = style(feature);
      }else{
        item = style;
      }
      // console.log(item);
      if(!item.icon && !item.text && !item.zIndex)return null;

      let styleOption = {};
      if(item.icon){
        styleOption.image = new Icon({
          src: item.icon,
          anchor: item.anchor || [0.5, 0.5],
        });
      }
      if(item.text){
        let text = item.text;
        styleOption.text = new Text({
          text: text || '',
          offsetY: 25,
          font: '13px sans-serif',
          textAlign: 'center',
          fill: new Fill({ color: 'orange'}),
        });
      }
      if(item.zIndex){
        styleOption.zIndex = item.zIndex;
      }

      return new Style(styleOption);
    },
    /**
     * 生成Feature
     * @param item 含经纬度的点位信息
     * @param style option {Function | Object}
     * {
     *   text,
     *   zIndex,
     *   icon
     * }
     * @returns {*}
     */
    getFeature(item, style){
      let coor = this.getLonLat(item);
      if(!coor)return;

      let feature = new Feature({
        geometry: new Point(coor),
      });
      if(style){
        feature.setStyle((feature) => {
          return this.getFeaturesStyle(style, feature);
        });
      }
      feature.setProperties(item);
      if(item.id){
        feature.setId(item.id);
      }
      return feature;
    },
    /**
     * 获取聚合样式
     * @param option
     * {
     *   color, // 聚合点位颜色
     * }
     * @returns {function(*=): Style}
     */
    getClusterStyle(option){
      return function (feature) {
        let styleOption;
        if(_.isFunction(option.styleOption)){
          styleOption = option.styleOption(feature);
        }else{
          styleOption = option.styleOption;
        }
        const size = feature.get('features').length;
        let style = option.styleCache[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: '#fff',
              }),
              fill: new Fill({
                color: styleOption.color || '#3399CC',
              }),
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff',
              }),
            }),
          });
          option.styleCache[size] = style;
        }
        return style;
      };
    },
    /**
     * 箭头样式
     * @param linePoints
     */
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
    getDrawResult(geoFeature, type) {
      if (geoFeature) {
        let geometry = geoFeature.getGeometry();
        let coordinates = // 根据不同的绘制类型获取不同的坐标值。
          void 0; // 根据不同的绘制类型获取不同的坐标值。
        let result = {};
        result['drawFeatureId'] = geoFeature.id; //绘制元素的id
        result['drawFeature'] = geoFeature;
        if (type === 'Circle') {
          coordinates = geometry.getCenter();
          let u = this.mapObj.getView().getProjection().getMetersPerUnit();
          result['radius'] = geometry.getRadius() * u;
        } else {
          coordinates = geometry.getCoordinates()[0];
          let lonLats_1 = [];
          coordinates.forEach(function (xy) {
            lonLats_1.push(xy);
          });
          coordinates = lonLats_1;
        }
        result['coordinates'] = coordinates;
        result['type'] = 'drawByHandle';
        return result;
      }
    },

  }
};
