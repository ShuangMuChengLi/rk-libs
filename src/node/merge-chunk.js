const path = require('path');
const { streamMerge } = require('./split-chunk-merge');
const fileName = 'test.mp4';
const inputPath = path.join(__dirname, 'chunks/');
const outputPath = path.join(__dirname, 'chunks-' + fileName);
const inputPathList = new Array(88).fill().map((item, index) => {
  return inputPath + fileName + '-chunk-' + index;
});

streamMerge(inputPathList, outputPath).then(res => {
  console.log(res); // .../chunks/chunks.jpg
});
