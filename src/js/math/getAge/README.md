# 计算年龄
## download
[库文件下载](./js/math/getAge.zip)
## dependence
无
## constructor
```
getAge(birthday)
```
## arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| birthday | Date或者能被Date解析的对象 | Date、Date like | - | -  | 
## return
| 类型 |	说明 |
| ---- | ---- |
| Number | 距今年龄 |


## usage
```
import { getAge } from './getAge';
getAge('1988-10-08'); // 33
getAge(new Date('1988-10-08')); // 33
```

