# 页面f11全屏api
需要用户点击页面有所交互后，才生效。
```javascript
var el = document.documentElement;
this.rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;//定义不同浏览器的全屏API
//执行全屏
this.rfs.call(el);
```
