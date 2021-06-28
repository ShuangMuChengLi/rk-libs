import Polygon from 'ol/geom/Polygon';
import { fromLonLat, getTransform } from 'ol/proj';

export function intersectsCoordinate(list, point){
  const p = new Polygon(list);
  p.applyTransform(getTransform('EPSG:4326', 'EPSG:3857'));
  return p.intersectsCoordinate(fromLonLat(point));
}
