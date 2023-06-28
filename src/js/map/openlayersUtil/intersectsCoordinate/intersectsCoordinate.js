import Polygon from 'ol/geom/Polygon';
import { fromLonLat, getTransform } from 'ol/proj';
import {getDistance} from '../point-distance/point-distance';
/**
 * 判断点位在地图几何范围内
 * @param list
 * @param point
 * @returns {boolean}
 */
export function intersectsCoordinate(list, point){
  const p = new Polygon(list);
  p.applyTransform(getTransform('EPSG:4326', 'EPSG:3857'));
  return p.intersectsCoordinate(fromLonLat(point));
}

/**
 *  判断点位在圆内
 * @param center
 * @param radius KM
 * @param point
 * @returns {boolean}
 */
export function intersectsCoordinateFromCircle(center, radius, point){
  let distance = getDistance(...center, ...point);
  return distance < radius;
}
