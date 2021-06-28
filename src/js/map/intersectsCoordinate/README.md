# 判断点位在地图几何范围内
## download
[库文件下载](./js/map/intersectsCoordinate.zip)
## dependence
ol
## constructor
```
intersectsCoordinate(list, point);
```
## arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| list | 几何图形经纬度数组 | [[[lon, lat]...]...] | - | -  | 
| point | 点位经纬度数组 | [lon, lat] | - | -  | 
## return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | true: 点位在几何体内，false反之 |


## usage
```
import { intersectsCoordinate } from './intersectsCoordinate';
let list = [[
  [116.314582, 39.979764],
  [116.456011, 39.979764],
  [116.464635, 39.854919],
  [116.311132, 39.868654],
  [116.314582, 39.979764]
]];
let point = [116.341028, 39.947468];
let result = intersectsCoordinate(list, point);
console.log(result); // true
```
