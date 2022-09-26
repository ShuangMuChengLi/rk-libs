# 屏幕截屏
## dependence
html2canvas、saveAs、jsPdf
## 步骤
1. 通过html2canvas将页面转换为canvas
2. 通过canvas.toBlob方法将canvas转换为blob
3. 通过saveAs库将blob转换为图片并下载 
4. 通过jsPdf库将blob转换为PDF并分页下载

## 代码
```
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
html2canvas(document.body).then(function(canvas) {
  canvas.toBlob(function(blob) {
    saveAs(blob, 'screenshot.png');
  });
});

//dom是截图元素的节点 title是到处图片的标题
import jsPDF from 'jspdf';
html2canvas(dom, { allowTaint: true }).then(canvas => {
  let contentWidth = canvas.width, contentHeight = canvas.height;
  let pageHeight = contentWidth / 592.28 * 841.89, leftHeight = contentHeight, position = 0;
  let imgWidth = 592.28, imgHeight = 592.28 / contentWidth * contentHeight;
  let pageData = canvas.toDataURL('image/jpeg', 1.0);
  let PDF = new jsPDF('', 'pt', 'a4');
  if (leftHeight < pageHeight) {
    PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
  } else {
    while (leftHeight > 0) {
      PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= 841.89;
      if (leftHeight > 0) {
        PDF.addPage();
      }
    }
  }
  PDF.save(title + '.pdf');
});
```
