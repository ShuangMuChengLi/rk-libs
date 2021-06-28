# 二维数组穷尽组合
将二维数组穷尽组合
 输入：[ ['a1','a2'], ['b1','b2']...]
 输出：[ [ 'a1', 'b1' ...], [ 'a1', 'b2' ...], [ 'a2', 'b1'... ], [ 'a2', 'b2'... ]... ]
## download
[库文件下载](./js/math/combination.zip)
## dependence
无
## constructor
```
combination(list)
```
## arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| list | 任意长度的二维数组 | Array | - | -  | 
## return
| 类型 |	说明 |
| ---- | ---- |
| Array | 所有的组合形式的二维数组 |


## usage
```
import { combination } from './combination';
combination([ ['a1','a2'], ['b1','b2']]); // [ [ 'a1', 'b1'], [ 'a1', 'b2'], [ 'a2', 'b1'], [ 'a2', 'b2']]
```

