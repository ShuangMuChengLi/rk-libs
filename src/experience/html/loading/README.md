# Vue.js页面初始化加载中效果
不能通过vue的代码中写loading代码。因为那时页面js也还在加载中。所以要在index.html的```<div id="app"></div>```中写loadinghtml块。   
等Vue初始化后，会自动将```<div id="app"></div>```的loading内容清空。

## demo
```
<head>
  <style>
      .body-loading{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
      }
      .body-loading-bg{
          position: relative;
      }
      .loading-test{
          text-align: center;
          color: #aaa;
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translate(-50%, 0);
      }
  </style>
</head>
<div id="app">
    <div class="body-loading">
        <div class="body-loading-bg">
            <img src="./loading2.gif"/>
            <p class="loading-test">Ping Ming Loading……</p>
        </div>
    </div>
</div>
```
