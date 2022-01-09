# 常用css效果汇总
## 滚动条样式优化
```
::-webkit-scrollbar{
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track{
  border-radius: 20px;
  background-color: transparent;a
}
::-webkit-scrollbar-thumb{
  background: #ccc;
  border-radius: 10px;
}
```
## 文本超出隐藏
```
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```
## 多行文本超出隐藏
```
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```
## 纯数字或字母强制换行
```
white-space:normal; 
word-break:break-all;
```
## 上下左右居中
```
display:flex;
align-items:center;/*垂直居中*/
justify-content: center;/*水平居中*/
```
或   
```
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

## 为表格设置合并边框模型
```
table{
  border-collapse:collapse;
}
```
## 哀悼日网站全部置灰或部分置灰
```
html{
  filter: grayscale(100%);
}
```
