# md5、sha加密
实现对数据的md5 sha1 sha256 sha512加密
## download
[库文件下载](./js/math/md5-sha.zip)
## dependence
Node.js自带crypto库
## Function
```
md5Sha(message, algorithm = 'md5')
```
## arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| message | 任意数据 | String | - | -  | 
| algorithm | md5、sha1、sha256、sha512 | String | - | md5 | 
## return
| 类型 |	说明 |
| ---- | ---- |
| String | 加密后的十六进制的字符串 |


## usage
```
import md5Sha from './md5-sha';
md5Sha('123456'); // e10adc3949ba59abbe56e057f20f883e
```

