# 伪数组转换为数组
## contributor
肖广
## dependence
无
## function
```javascript
let elements = document.getElementsByTagName("div");
console.log(typeof(elements.length), typeof(elements.forEach)) // number undefined
// 这里的 elements 是一个伪数组，elements 具有 length，但不具有 Array 中的方法及其他属性
function transformElements(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}
let elementsList = transformElements(elements);
console.log(typeof(elementsList.length), typeof(elementsList.forEach)) // number function

```
