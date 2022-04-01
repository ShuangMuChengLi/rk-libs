export class Ws{
  /**
   *
   * @param option
   */
  constructor(option) {
    this.timer = null;
    this.option = option;
    this.option.reconnectSecond = this.option.reconnectSecond || 30;
    this.option.isJSON = true;
    this.ws = null;
    this.state = null;
    this.initWebsocket();
  }
  initWebsocket(){
    clearTimeout(this.timer);
    console.log('连接中...', this.option.url);
    this.state = 'connecting';
    this.stateChange();
    let ws = new WebSocket(this.option.url);
    this.ws = ws;
    ws.onopen = ()=>
    {
      console.log('已连接...', this.option.url);
      this.state = 'connected';
      this.stateChange();
    };

    ws.onmessage = (evt)=>
    {
      let received_msg = evt.data;
      if(this.option.isJSON){
        try {
          if(this.option.fn){
            this.option.fn(JSON.parse(received_msg));
          }
        }catch (e){
          console.error('解析失败', e, evt.data);
        }
      }else{
        this.option.fn(evt.data);
      }
    };

    ws.onclose = ()=>
    {
      // 关闭 websocket
      console.error('连接关闭...', this.option.url);
      this.state = 'offline';
      this.stateChange();
      this.timer = setTimeout(()=>{
        console.log('重新连接...', this.option.url);
        this.initWebsocket();
      }, this.option.reconnectSecond * 1000);
    };
  }
  close(){
    if(this.ws){
      clearTimeout(this.timer);
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
      this.state = 'offline';
      this.stateChange();
    }
  }
  reconnect(){
    if(this.ws){
      this.ws.close();
    }
    this.initWebsocket();
  }
  getState(){
    return this.state;
  }
  stateChange(){
    if(this.option.onChange){
      this.option.onChange(this.state);
    }
  }
}
