# 对点位列表以一定距离进行聚合分组
## download
[库文件下载](./js/map/point-cluster.zip)
## Function
```
pointCluster(options)
```
## arg
| 参数 |	说明 |类型 | 是否必填	| 可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | ----  | 
|  option.list | 点位列表 | Array | 是 | -  |  -  | 
| option.d | 以多少公里范围聚合 | Number | 是 | -  |  -  | 
| option.lonName | 列表中的经度名称 | String | 否 | -  |  lon  | 
| option.latName | 列表中的纬度名称 | String | 否 | -  |  lat  | 
## return
| 类型 |	说明 |
| ---- | ---- |
| Array | 聚合分组后的列表 |

## 聚合分组后的列表格式
```
[
  {
    lon,
    lat,
    data: [
      point
    ]
  }
]
```

## Unit Test
```
import { pointCluster } from './point-cluster';

let list = [
  {
    lon: 116.399166,
    lat: 39.919836
  },
  {
    lon: 116.400909,
    lat: 39.920057
  },
  {
    lon: 116.408455,
    lat: 39.920292
  },
];
test('pointCluster', () => {
  let result = pointCluster({
    list,
    d: 0.5,
    lonName: 'lon',
    latName: 'lat'
  });
  expect(result.length).toBe(2);
});

```
