# 汉字笔画排序、拼音排序
## 笔画排序
使用到[拼音笔画js库cnchar](https://www.theajack.com/cnchar/) ,获取笔画数以进行排序。

## 拼音排序
用到了Sting.localeCompare
```
let result = ['张三', '李四', '王五'].sort(function(a, b){
  return a.localeCompare(b, 'cn');
});
console.log(result);
```
