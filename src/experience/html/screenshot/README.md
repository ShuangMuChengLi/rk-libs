# 屏幕截屏
## dependence
html2canvas、saveAs
## 步骤
1. 通过html2canvas将页面转换为canvas
2. 通过canvas.toBlob方法将canvas转换为blob
3. 通过saveAs库将blob转换为图片并下载

## 代码
```
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
html2canvas(document.body).then(function(canvas) {
  canvas.toBlob(function(blob) {
    saveAs(blob, 'screenshot.png');
  });
});
```
