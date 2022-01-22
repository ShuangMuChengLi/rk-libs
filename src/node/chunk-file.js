const path = require('path');
const fs = require('fs');
const { splitByParts, bufferMerge } = require('./split-chunk-merge');
const fileName = 'dist.zip';
const filePath = path.resolve(__dirname, fileName);
const targetPath = path.resolve(__dirname, './chunks');

splitByParts(filePath, 3, targetPath, fileName).then(res => {
  // <file>-chunk-1
  // ...
  // <file>-chunk-3
  console.log(res);
});
