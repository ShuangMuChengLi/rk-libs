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

<style scoped>

</style>
