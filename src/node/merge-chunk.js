const path = require('path');
const { streamMerge } = require('./split-chunk-merge');
const fileName = 'test.mp4';
const inputPath = path.join(__dirname, 'chunks/');
const outputPath = path.join(__dirname, 'chunks-' + fileName);
const inputPathList = new Array(2).fill().map((item, index) => {
  return inputPath + (index + 1) + '.mp4';
});

streamMerge(inputPathList, outputPath).then(res => {
  console.log(res); // .../chunks/chunks.jpg
});
