# 会话存储和本地存储
## download
[库文件下载](./js/html/storage-util.zip)
## dependence
无
## Object
```
storageUtil
```
### storageUtil.getSession(key)
根据Key获取会话存储，尝试用JSON.parse()解析value。如果解析失败，原样返回
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| key | 会话存储的key | String | 是 | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Any | 会话存储value |

### storageUtil.setSession(key, value)
存储会话存储，存储前会尝试JSON.stringify(value)
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| key | 会话存储的key | String | 是 | -  | 
| value | 会话存储的value | Any | 是 | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | key不是String类型时，或浏览器不支持时返回false |


### storageUtil.removeSession(key)
移除会话存储
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| key | 会话存储的key | String | 是 | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | key不是String类型时，或浏览器不支持时返回false |


### storageUtil.clearSession()
清空所有会话存储
#### return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | 浏览器不支持时返回false |

### storageUtil.getLocalStorage(key)
根据Key获取本地存储，尝试用JSON.parse()解析value。如果解析失败，原样返回
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| key | 本地存储的key | String | 是 | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Any | 本地存储value |

### storageUtil.setLocalStorage(key, value)
存储本地存储，存储前会尝试JSON.stringify(value)
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| key | 本地存储的key | String | 是 | -  | 
| value | 本地存储的value | Any | 是 | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | key不是String类型时，或浏览器不支持时返回false |


### storageUtil.removeLocalStorage(key)
移除本地存储
#### arg
| 参数 |	说明 |类型 |是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| key | 本地存储的key | String | 是 | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | key不是String类型时，或浏览器不支持时返回false |


### storageUtil.clearLocalStorage()
清空所有本地存储
#### return
| 类型 |	说明 |
| ---- | ---- |
| Boolean | 浏览器不支持时返回false |


## usage
```
import { storageUtil } from './storage-util';

storageUtil.setSession('key', {name: 'Joe'});
storageUtil.getSession('key'); // {name: 'Joe'}
storageUtil.removeSession('key');
storageUtil.clearSession();

storageUtil.setLocalStorage('key', {name: 'Joe'});
storageUtil.getLocalStorage('key'); // {name: 'Joe'}
storageUtil.removeLocalStorage('key');
storageUtil.clearLocalStorage();
```
