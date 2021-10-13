import { getDistance } from '../point-distance/point-distance';

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
export function pointCluster(options){
  let {
    list,
    d = 0.5,
    lonName = 'lon',
    latName = 'lat'
  } = options;
  let group = [];
  let getNear = (data)=>{
    data.isGrouped = true;
    let groupItem = {
      ...data,
      data: [data]
    };
    for(let item of list){
      if(item.isGrouped)continue;

      let distance = getDistance(data[lonName], data[latName], item[lonName], item[latName]);
      if(distance < d){
        groupItem.data.push(item);
        item.isGrouped = true;
      }
    }
    group.push(groupItem);
  };
  for(let item of list){
    if(item.isGrouped)continue;

    getNear(item);
  }
  return group;
}
