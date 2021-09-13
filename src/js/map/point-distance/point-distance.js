const EARTH_RADIUS = 6378.137;//地球半径
function rad(d)
{
  return d * Math.PI / 180.0;
}
export function getDistance(lon1, lat1, lon2, lat2 )
{
  let radLat1 = rad(lat1);
  let radLat2 = rad(lat2);
  let a = radLat1 - radLat2;
  let b = rad(lon1) - rad(lon2);

  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
}
