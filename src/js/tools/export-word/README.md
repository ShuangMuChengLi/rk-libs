# 导出word文档
src\js\tools\export-word\exportWord.js   
```
import { exportBuf } from '@/utils/export-excel';
exportDoc(item) {
    let content = `
<p>${item.name}</p>      
<p>${item.sex}</p>      
<img src="${item.photoUrl}"  />
<p>${item.content}</p>   
`;
    exportWord(content, '名称');
},
```