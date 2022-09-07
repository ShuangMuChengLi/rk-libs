# 通过adm-zip读取docx文档的数据
## package
adm-zip
### usage
```javascript
const path = require('path');
const AdmZip = require('adm-zip'); //引入查看zip文件的包
const zip = new AdmZip(path.resolve(__dirname, '123.docx')); //filePath为文件路径
let contentXml = zip.readAsText('word/document.xml');//将document.xml读取为text内容；
console.log(contentXml);
zip.addFile('word/document.xml', Buffer.from(contentXml.replace('123', '222'), 'utf8')); // 替换其中的字符
zip.writeZip(path.resolve(__dirname, '1234.docx'));
```
