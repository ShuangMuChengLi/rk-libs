# 带自动重连的websocket类Ws
## download
[库文件下载](./js/html/ws.zip)
## Class
```
Ws(options);
```
## options
| 参数 |	说明 |类型 | 是否必填	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| url | websocket地址 | String | 是 | -  | 
| reconnectSecond | 连接失败后，多少秒进行重连 | Number | false | 30  | 
| isJSON | 如果为true,fn的回调参数是JSON.parse后的数据。如果为false,则不进行解析处理，直接返回 | Boolean | false | true  | 
| fn | 获取数据的回调，参数是websocket返回数据data | Function | false | -  | 
| onChange | 连接websocket状态改变时的回调，参数是连接状态码 | Function | false | -  | 

## properties
### state   
连接状态码   
| 状态码 |	说明 |
| ---- | ---- |
| 'connecting' | 连接中 |
| 'connected' | 连接成功 |
| 'offline' | 未连接 |

## methods
### close
关闭websocket连接

### reconnect
websocket手动重连

### getState
获取当前连接状态码
#### return String



## usage
```
<template>
  <div>
    <p>Ws demo</p>
    <el-button @click="inWs">
      连接
    </el-button>
    <el-button @click="reconnect">
      重连
    </el-button>
    <el-button @click="close">
      断开
    </el-button>
    <p>状态: {{ state }}</p>
  </div>
</template>

<script>
import { Ws } from './ws';

export default {
  name: 'WsDemo',
  data(){
    return {
      ws: null,
      state: null
    };
  },
  mounted(){
  },
  beforeDestroy() {
    this.ws.close();
  },
  methods:{
    inWs(){
      this.ws = new Ws({
        url: 'ws://localhost:10999/webSocket/policeCarInfo/token',
        /**
         * 获取到数据时回调
         * @param data 回调数据
         */
        fn: (data) => {
          console.log(data);
        },
        /**
         * 状态改变时的回调
         * @param state  状态码connecting、connected、offline
         */
        onChange: (state) => {
          this.state = state;
        },
        /**
         * 是否JSON解析数据，默认true
         */
        isJSON: true,
        /**
         * 自动重连的时间，单位秒，默认30
         */
        reconnectSecond: 30
      });
    },
    reconnect(){
      this.ws.reconnect();
    },
    close(){
      this.ws.close();
    }
  }
};
</script>
```
