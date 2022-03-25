# css兼容性问题及解决方案整理
## flex布局，高度设置问题
### 问题描述
父级是flex布局的不设置高度的子元素。   
该元素在高版本浏览器设置百分比高度有效，而在低版本浏览器中设置百分比高度失效。
```less
.wrapper{
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  .inner {
    flex: auto;
    .inner-body {
      height: 100%; // 低版本谷歌59以下失效，高版本谷歌生效
    }
  }
}
```
### 解决方案
该元素弃用百分比高度设置，父级也设置弹性布局
```less
.wrapper{
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  .inner {
    display: flex;
    flex: auto;
    .inner-body {
      flex: auto;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
```
