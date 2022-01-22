const path = require('path');
const { streamMerge } = require('./split-chunk-merge');
const fileName = 'dist.zip';
const inputPath = path.join(__dirname, 'chunks/');
const outputPath = path.join(__dirname, 'chunks-' + fileName);
const inputPathList = new Array(3).fill().map((item, index) => {
  return inputPath + fileName + '-chunk-' + index;
});

streamMerge(inputPathList, outputPath).then(res => {
  console.log(res); // .../chunks/chunks.jpg
});
