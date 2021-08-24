# 数学函数库
## download
[库文件下载](./js/math/rk-math.zip)
## Class
```
rkMath
```
## Methods
### rkMath.getBaseLog(x, y) 
获取x为底，y的对数
#### args
| 参数 |	说明 |类型 |是否必填 | 可选值	| 默认值 | 
| ---- | ---- |---- | ----   |----  | ---- |
| x | 底数 | Number | true | - | -  | 
| y | 幂 | Number | true | - | - | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Number | x为底，y的对数 |

### rkMath.isOdd(x)
是否奇数
#### args
| 参数 |	说明 |类型 |是否必填 |可选值	| 默认值 | 
| ---- | ---- |---- | ----   |----  | ---- |
| x | 待判断的数值 | Number | true | - | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | true:奇数， false:偶数 |


## unit test
```
import { rkMath } from './rk-math';
test('getBaseLog', () => {
  expect(rkMath.getBaseLog(10, 100)).toBe(2);
});

test('isOdd', () => {
  expect(rkMath.isOdd(2)).toBe(false);
  expect(rkMath.isOdd(1)).toBe(true);
});

```

