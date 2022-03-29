import Polygon from 'ol/geom/Polygon';
import { fromLonLat, getTransform } from 'ol/proj';
import {getDistance} from '../point-distance/point-distance';
/**
 *
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
 *
 * @param center
 * @param radius KM
 * @param point
 * @returns {boolean}
 */
export function intersectsCoordinateFromCircle(center, radius, point){
  let distance = getDistance(...center, ...point);
  return distance < radius;
}
