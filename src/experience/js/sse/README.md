#  Server-Sent Events前端对接
[https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
## js
```js
  async stream(params, fn) {
    let streamAbortController = new AbortController();
    let response = await fetch('/sse/personal/v1/repositorySearch/search/stream', {
      method: 'POST',
      body: JSON.stringify(systemUtil.getJSONData(params)),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
      redirect: 'follow',
      Connection: 'keep-alive',
      signal: streamAbortController.signal
    }).catch(error => false);
    if(!response)return;

    const reader = response.body.getReader();
    (function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          console.log('done');
          fn('done');
          return;
        }
        let data = new TextDecoder('utf-8').decode(value);
        if(fn) {
          fn(data);
        }
        // 递归调用read函数以继续读取数据流
        read();
      });
    })();
    return streamAbortController;
  },
```
```js
let streamAbortController = await repositorySearch.stream({  
    'text': text,
    'type': this.type,
    id: this.dialogId
}, callback);
if(!streamAbortController)return;

this.streamAbortController = streamAbortController;
```
## 代理配置vue.config.js
```js
module.exports = defineConfig({
  devServer: {
    compress: false,
    proxy: {
      ['/sse']: {
        target: process.env.VUE_APP_APP_SERVER,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['/sse']: '',
        },
      },
    },
  },
});

```
## 代理配置nginx.conf
```
location ^~ /sse/ {
    proxy_pass http://172.19.3.25:10211/;
    proxy_buffering off;
}

```