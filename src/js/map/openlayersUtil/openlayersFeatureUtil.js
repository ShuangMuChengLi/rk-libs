import {intersectsCoordinate, intersectsCoordinateFromCircle} from './intersectsCoordinate/intersectsCoordinate';
import {getDistance} from './point-distance/point-distance';
import {groupPointByDistance} from './groupPointByDistance/groupPointByDistance';

export const openlayersFeatureUtil = {
  /**
   * 判断点位在地图几何范围内
   * @param list
   * @param point
   * @returns {boolean}
   */
  intersectsCoordinate,
  /**
   *  判断点位在圆内
   * @param center
   * @param radius KM
   * @param point
   * @returns {boolean}
   */
  intersectsCoordinateFromCircle,
  /**
   * 计算两经纬度点位的距离
   * @param lon1
   * @param lat1
   * @param lon2
   * @param lat2
   * @returns {number}
   */
  getDistance,
  /**
   * 对点位列表以一定距离进行聚合分组
   * @param options
   * option.list 点位列表
   * option.d 以多少公里范围聚合
   * option.lonName 列表中的经度名称  默认lon
   * option.latName 列表中的纬度名称  默认lat
   * @return {[
   *   {
   *     lon,
   *     lat,
   *     data: [
   *       point
   *     ]
   *   }
   * ]}
   */
  groupPointByDistance,
  /**
   * 根据id获取聚合图层的feature点位
   * @param layer
   * @param id
   * @returns {null|*|import("../Feature.js").default<import("../geom/Geometry.js").default>}
   */
  getClusterFeatureById(layer, id){
    let feature = layer.getSource().getSource().getFeatureById(id);
    if(!feature)return null;

    return feature;
  },
  /**
   * 改变feature经纬度
   * @param feature
   * @param coordinates
   */
  changePosition(feature, coordinates){
    if(!feature)return;

    feature.getGeometry()?.setCoordinates(coordinates);
  },

};
