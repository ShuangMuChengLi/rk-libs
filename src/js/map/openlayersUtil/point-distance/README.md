# 计算两经纬度点位的距离
## download
[库文件下载](./js/map/point-distance.zip)
## Function
```
getDistance(lon1, lat1, lon2, lat2 )
```
## arg
| 参数 |	说明 |类型 | 是否必填	| 可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | ----  | 
| lon1 | 点位1的经度 | Number | 是 | -  |  -  | 
| lat1 | 点位1的纬度 | Number | 是 | -  |  -  | 
| lon2 | 点位2的经度 | Number | 是 | -  |  -  | 
| lat2 | 点位2的纬度 | Number | 是 | -  |  -  | 
## return
| 类型 |	说明 |
| ---- | ---- |
| Number | 两点的距离（公里） |


## Unit Test
```
import { getDistance } from './point-distance';

test('getDistance', () => {
  const result = getDistance(...[116.398232, 39.929004], ...[116.408203, 39.929405] );
  expect(result).toBe(0.8523);
});
```
