# js生成pdf——jsPDF
[npm](https://www.npmjs.com/package/jspdf)  
[demo](http://raw.githack.com/MrRio/jsPDF/master/index.html)  
[doc](http://raw.githack.com/MrRio/jsPDF/master/docs/index.html)
## package
jspdf
### usage
```javascript
const { jsPDF } = require('jspdf'); // will automatically load the node version
const fs = require('fs'); // will automatically load the node version
const path = require('path');
const doc = new jsPDF();
doc.addFont(path.resolve(__dirname, 'simkai.ttf'), 'MyFont', 'normal');
doc.setFont('MyFont');
doc.text('爱我中华!', 10, 10);
doc.save('a4.pdf'); // will save the file in the current working directory

```
```vue
<template>
  <div>
    <el-button
      type="primary"
      @click="test"
    >
      下载
    </el-button>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf';
import simkai from './simkai.ttf';
const fs = require('fs'); // will automatically load the node version
const path = require('path');
export default {
  name: 'JsPdfDemo',
  mounted() {
  },
  methods:{
    getBase64(imgUrl) {

    },
    test(){
      const doc = new jsPDF();
      doc.addFont(simkai, 'MyFont', 'normal');
      doc.setFont('MyFont');
      doc.text('爱我中华!', 10, 10);
      doc.save('a4.pdf'); // will save the file in the current working directory

    }
  },
};
</script>

<style scoped>

</style>

```
