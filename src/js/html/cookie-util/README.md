# cookie工具类
## download
[库文件下载](./js/html/cookie-util.zip)
## dependence
无
## functions
### getCookie(key)
根据key获取cookie
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| name | cookie的key | String | 是 | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| String | cookie的value |

### setCookie(key, value)
存储cookie
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| key | cookie的key | String | 是 | -  | 
| value | cookie的value | String | 是 | -  | 
#### return
null


### removeCookie(key)
根据key移除cookie
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| key | cookie的key | String | 是 | -  | 
#### return
null

## usage
```
import { getCookie, removeCookie, setCookie} from './cookie-util';
setCookie('name', 'Joe');
getCookie('name'); // 'Joe'
removeCookie('name');
```
