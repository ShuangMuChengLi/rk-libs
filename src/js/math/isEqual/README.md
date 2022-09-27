# Javascript中判断两个小数是否是相等的
```javascript
  // 在js中
  0.1 + 0.2 === 0.3 // false
  // 0.1 + 0.2的结果是 0.30000000000000004
``` 
由于js中对于浮点数的定义，导致浮点数相加时出现误差

## dependence
无
## function
```javascript
  function isEqual(n1, n2) {
    if (Number.EPSILON === undefined) {
      Number.EPSILON = Math.pow(2, -52);
    }
    return Math.abs(num1 - num2) < Number.EPSILON;
  }
  // Number.EPSILON 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值。

```
## document
[Number.EPSILON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)