# URL相关操作
使用原生js的URL对象实现的url工具类
## download
[库文件下载](./js/html/rk-url.zip)
## dependence
null
## methods
### rkUrl.addParameter (url, searchParamsSet)
根据searchParamsSet键值对，往url添加searchParams
#### arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| url | 待添加searchParams的url | String或者能被new URL解析的对象 | - | -  | 
| searchParamsSet | searchParams键值对 | Object<{key: value}> | - | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| String | 添加searchParams后的的url |

### parameterToJson(paramsString)
URL的查询字符串转JSON
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| paramsString | URL的查询字符串 | String | - | true  |  -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Object | 转换后的JSON对象 |

### jsonToParameter(json)
JSON转URL的查询字符串
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| json | 待转换的json对象 | Object | - | true  |  -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| String | 转换后的URL的查询字符串 |


## unit test
```
import { rkUrl } from './rk-url';
test('addParameter', () => {
  const url = 'https://www.linchaoqun.com/cms.html?token=token#/list';
  const searchParamsSet = {
    page: 1,
    size: 10
  };
  const result = rkUrl.addParameter(url, searchParamsSet);
  expect(result).toBe('https://www.linchaoqun.com/cms.html?token=token&page=1&size=10#/list');
});

test('parameterToJson', () => {
  const result = rkUrl.parameterToJson('token=token');
  expect(result.token).toBe('token');
});


test('jsonToParameter', () => {
  const result = rkUrl.jsonToParameter({token: 'token'});
  expect(result).toBe('token=token');
});

```
