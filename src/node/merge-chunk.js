const path = require('path');
const { streamMerge } = require('./split-chunk-merge');

const inputPath = path.join(__dirname, 'chunks/');
const outputPath = path.join(__dirname, 'chunks.mp4');
const inputPathList = new Array(3).fill().map((item, index) => {
  return inputPath + '1.mp4-chunk-' + index;
});

streamMerge(inputPathList, outputPath).then(res => {
  console.log(res); // .../chunks/chunks.jpg
});
