# axios封装类
## Install
```javascript
import Vue from 'vue';
import {axios} from './js/html/axios/axios';
Vue.use(axios);
```
## 依赖
lodash、axios、Vue、url、querystring
## 下载
[库文件下载](./js/html/axios.zip)
## Methods
### this.axios.install(Vue)
将axios挂载在vue上，使得可以在vue组件中通过this.axios使用axios方法
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| Vue | Vue类 | Vue | - | true  |  -  | 

### this.axios.post(url, data, option)
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| url | 接口url | String | - | true  |  -  | 
| data | 数据 | Any | - | false  |  -  | 
| option | axios的options | Object | - | false  |  -  | 
特别地，相较于原生axios的option，该option可以传入cancelToken作为取消请求的唯一标识，默认为请求的url作为标识。

### this.axios.get(url, data, option)
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| url | 接口url | String | - | true  |  -  | 
| data | 数据 | Any | - | false  |  -  | 
| option | axios的options | Object | - | false  |  -  | 
特别地，相较于原生axios的get请求，该get请求的第二个参数是数据，序列化后拼接在url后。

### this.axios.delete(url, data, option)
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| url | 接口url | String | - | true  |  -  | 
| data | 数据 | Any | - | false  |  -  | 
| option | axios的options | Object | - | false  |  -  | 

### this.axios.patch(url, data, option)
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| url | 接口url | String | - | true  |  -  | 
| data | 数据 | Any | - | false  |  -  | 
| option | axios的options | Object | - | false  |  -  | 

### this.axios.put(url, data, option)
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| url | 接口url | String | - | true  |  -  | 
| data | 数据 | Any | - | false  |  -  | 
| option | axios的options | Object | - | false  |  -  | 

### this.axios.all(methodsList)
处理并发请求
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| methodsList | 异步的请求方法的数组 | Array | - | true  |  -  | 

### this.axios.cancelSingleRequest(cancelToken)
取消cancelToken为唯一标识的请求
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| cancelToken | 取消请求的唯一标识，请求option时传入的cancelToken，默认为url | String | - | true  |  -  | 

### this.axios.cancelAllRequest()
取消所有请求

### this.axios.verifyResponse(data, isAlert)
验证then数据，返回result字段的值
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| data | 请求then方法中返回的值 | Object | - | true  |  -  | 
| isAlert | 如果返回值不等于200是否出现告警提示框 | Boolean | - | false  |  false  | 

### this.axios.verifyDataResponse(data, isAlert)
验证then数据，返回Boolean类型
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| data | 请求then方法中返回的值 | Object | - | true  |  -  | 
| isAlert | 如果返回值不等于200是否出现告警提示框 | Boolean | - | false  |  false  | 

### this.axios.handleResponseError(error)
处理catch异常，出现告警提示框，返回false
#### arg
| 参数 |	说明 |类型 |可选值	| 必填 | 默认值 |
| ---- | ---- |---- | ----   | ----  |  ----  | 
| error | catch的错误 | Error | - | true  |  -  | 
#### return
false

### this.axios.getFileHeader()
返回'Content-Type': 'multipart/form-data'请求头的axios option
#### return
```
{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}
```

### this.axios.getJsonHeader()
返回'Content-Type': 'application/json'请求头的axios option
#### return
```
{
    headers: {
        'Content-Type': 'application/json'
    }
}
```


### this.axios.getFormUrlencoded()
返回'Content-Type': 'application/x-www-form-urlencoded'请求头的axios option
#### return
```
{
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
```
## 使用范例
```javascript
export default {
    name: 'VideoExample',
    async mounted() {
        this.axios.cancelSingleRequest('cancelToken1');
        let result = await this.axios.post('./test1.json', {name: 'test'}, {
            ...this.axios.getJsonHeader(),
            cancelToken: 'cancelToken1'
        })
            .then(res=>this.axios.verifyResponse(res, true))
            .catch(this.axios.handleResponseError);

    }
};
```
