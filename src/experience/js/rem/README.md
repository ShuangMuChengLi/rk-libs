# 屏幕适配rem解决方案
## 普通方案
通过监听窗口的变化自动适配全局字体大小（默认宽度1920 默认字体大小16px）
```
import _ from 'lodash';
let remVlaue = 16;
const setRem = _.debounce(function () {
  var d = document.documentElement;
  var clientWidth = d.clientWidth;
  remVlaue = (clientWidth / 1920) * 16;
  d.style.fontSize = (clientWidth / 1920) * 16 + 'px';
},300);
window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize',setRem,false);
document.addEventListener('DOMContentLoaded', setRem, false);
window.addEventListener('pageShow', setRem, false);

export function transformPx(value) {
  return value * remVlaue;
}
```

## 扩展方案
自动转换全局使用的px，包含第三方扩展ui如element-ui。
操作如下：
1.安装postcss-plugin-px2rem依赖
2.在vue.config.js进行如下配置
```
css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            propList: ['*'],
            rootValue: 16, //px和rem的转换比例，16px => 1rem 
            exclude: /jsoneditor/i //正则匹配的方式排出不需要转换的插件
          })
        ]
      }
    }
  }
```
### 配置参数
| 参数 |	说明 |
| ---- | ---- |
| rootValue | （数字/对象）根元素字体大小。默认值为 100。如果 rootValue 是一个对象，例如{ px: 50, rpx: 100 }，它会将 rpx 替换为 1/100 rem ，并将 px 替换为 1/50 rem 。 |
| unitPrecision |（数字）允许 REM 单位增长到的十进制数字。|
| propWhiteList |（数组）可以从 px 更改为 rem 的属性。默认为空数组，表示禁用白名单并启用所有属性。|
| propBlackList |（数组）不应从 px 更改为 rem 的属性。|
| exclude |（Reg）一种排除某些文件夹的方法，例如。/node_module/。|
| selectorBlackList |（数组）要忽略并保留为 px 的选择器。如果 value 是字符串，它会检查 selector 是否包含字符串。['body']将匹配.body-class。如果 value 是 regexp，它会检查选择器是否与 regexp 匹配。[/^body$/]将匹配body但不匹配.body|
| ignoreIdentifier |（布尔值/字符串）一种忽略单个属性的方法，当启用 ignoreIdentifier 时，replace将设置为true自动。|
| replace |（布尔值）替换包含 rems 的规则，而不是添加回退。|
| mediaQuery |（布尔值）允许在媒体查询中转换 px。|
| minPixelValue |(数字) 设置要替换的最小像素值。|
