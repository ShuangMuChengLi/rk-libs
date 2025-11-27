# 常用css效果汇总

## 滚动条样式优化

```
::-webkit-scrollbar{
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track{
  border-radius: 20px;
  background-color: transparent;
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

```css
table {
    border-collapse: collapse;
}
```

## 哀悼日网站全部置灰或部分置灰

```css
html {
    filter: grayscale(100%);
}
```

## 字体渐变

```css
.page-title {
    font-size: 28px;
    font-weight: 700;
    background-image: -webkit-linear-gradient(bottom, #00a2ff, #e7e7e7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

## 色相、饱和度设置方法，及其动画

[效果预览](./index.html#/experience/html/css/css-demo)

```html

<div class="hue-rotate">
    <img src="./logo.png">
</div>
```   

```less
@-webkit-keyframes leafanim {
  50% {
    -webkit-filter: hue-rotate(-70deg) saturate(1.2);
  }
}

@keyframes leafanim {
  50% {
    -webkit-filter: hue-rotate(-70deg) saturate(1.2);
  }
}

.hue-rotate {
  -webkit-transition: 0.8s all;
  -webkit-animation: leafanim 3s ease 3s 1 normal none;
  transition: 0.8s all;
  animation: leafanim 3s ease 3s 1 normal none;

  &:hover, &:focus {
    -webkit-filter: hue-rotate(-70deg) saturate(1.5);
  }

  img {
    width: 300px;
  }
}
```

## 覆盖模糊
```css
.navbar-wrapper {
    position: relative;
    border-bottom: 1px solid var(--border-color);
    height: var(--header-height);
    padding: 0 12px 0 24px;
    background-image: radial-gradient(transparent 1px,var(--bg-color) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    -webkit-backdrop-filter: saturate(50%) blur(4px);
    top: 0;
}
```
## 背景模拟虚线
```css
.dashed{
  width: 10px;
  height: 1px;
  box-sizing: border-box;
  background-image: linear-gradient(to right, #2878DE 0%, #2878DE 50%, transparent 50%);
  background-size: 4px 1px;
  background-repeat: repeat-x;
  margin-right: 2px;
}
```
## 圆锥渐变
```css
background: conic-gradient(
    from 180deg at 50% 54%,
    #024165 0deg,
    #002454 360deg
);
```
1. 圆锥渐变（conic-gradient）
与线性渐变（从左到右）或径向渐变（从中心向外）不同，圆锥渐变是围绕中心点旋转的颜色过渡，类似钟表的颜色分布。

默认情况下，渐变从顶部（0deg）开始，顺时针旋转一周（360deg）。

2. 关键参数解析
(1) from 180deg
设置渐变的起始角度为 180deg（正下方，相当于时钟的 6 点方向）。

如果不设置，默认从 0deg（正上方）开始。

(2) at 50% 54%
渐变中心点定位在：

水平方向 50%（居中）

垂直方向 54%（比正中心略微靠下）。

如果省略，默认是 at 50% 50%（绝对居中）。

(3) 颜色断点
#024165 0deg：起始颜色为较浅的蓝色（色值 #024165），从 0deg 开始。

#002454 360deg：结束颜色为较深的蓝色（色值 #002454），到 360deg 完成一圈过渡。

由于两者色相接近，实际效果是一个非常柔和的环形渐变，可能看起来接近纯色，但有细微的明暗变化。


## 边框渐变
```css
.box {
    width: 112px;
    height: 96px;
    opacity: 1;

    /* 自动布局 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 17px;

    background: rgba(48, 83, 166, 0.2);

    box-sizing: border-box;
    border: 1px solid;
    border-image: radial-gradient(circle at center, rgba(106, 210, 255, 1), rgba(111, 216, 255, 0)) 1;
  }
```