# 判断点位在几何范围内
## download
[库文件下载](./js/math/isInPolygon.zip)
## dependence
无
## constructor
```
isInPolygon(checkPoint, polygonPoints)
```
## arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| polygonPoints | 几何图形数组 | [[x0, y0]...] | - | -  | 
| checkPoint | 点位数组 | [x, y] | - | -  | 
## return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | true: 点位在几何体内，false反之 |


## usage
```
import { isInPolygon } from './isInPolygon';
isInPolygon([1, 1], [[0, 0], [2, 0], [2, 2], [0, 2]]); // true
```

