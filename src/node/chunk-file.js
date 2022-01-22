const path = require('path');
const fs = require('fs');
const { splitByParts, bufferMerge } = require('./split-chunk-merge');

const filePath = path.resolve(__dirname, '1.mp4');
const targetPath = path.resolve(__dirname, './chunks');

splitByParts(filePath, 3, targetPath, '1.mp4').then(res => {
  // <file>-chunk-1
  // ...
  // <file>-chunk-3
  console.log(res);
});
