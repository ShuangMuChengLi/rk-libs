const request = require('request');
const fs = require('fs');
const path = require('path');
let buffers = [];
request(
  { method: 'GET'
    , uri: 'https://cms.cnc.blzstatic.cn/cms/gallery/FVX53VDQ0LX31637104896367.mp4'
    // , gzip: true
  }
  , function (error, response, body) {
    // body is the decompressed response body
    // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
    // console.log('the decoded data is: ' + body);
  }
)
  .on('data', function(data) {
    // decompressed data as it is received
    buffers.push(data);
  })
  .on('end', function(data) {
    // decompressed data as it is received
    const concatBuffer = Buffer.concat(buffers);

    // write the merged buffer to the output file
    fs.writeFileSync(path.resolve(__dirname, '2.mp4'), concatBuffer);
  });
// .pipe(fs.createWriteStream(path.resolve(__dirname, '1.mp4')));
// .on('response', function(response) {
//   // unmodified http.IncomingMessage object
//   response.on('data', function(data) {
//     // compressed data as it is received
//     console.log('received ' + data.length + ' bytes of compressed data');
//   });
// });
