const request = require('request');
const fs = require('fs');
const path = require('path');
let buffers = [];
let index = 0;
request(
  { method: 'GET'
    , uri: 'http://localhost:8080/chunks-test.mp4',
    headers:{
      'Range': 'bytes=0-6758950'
    }
    // , gzip: true
  }
  , function (error, response, body) {
    console.log(response.headers);
    // body is the decompressed response body
    // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
    // console.log('the decoded data is: ' + body);
  }
)
  .on('data', function(data) {
    // decompressed data as it is received
    // buffers.push(data);
    // fs.writeFile(path.resolve(__dirname, 'chunks', `test.mp4-chunk-${index}`), data, err => console.error(err));
    index++;
  })
  .on('end', function(data) {
    console.log('end');
    // decompressed data as it is received
    // const concatBuffer = Buffer.concat(buffers);
    //
    // // write the merged buffer to the output file
    // fs.writeFileSync(path.resolve(__dirname, '2.mp4'), concatBuffer);
  })
  .on('error', function(err) {
    console.log(err);
    // decompressed data as it is received
    // const concatBuffer = Buffer.concat(buffers);
    //
    // // write the merged buffer to the output file
    // fs.writeFileSync(path.resolve(__dirname, '2.mp4'), concatBuffer);
  })
  .pipe(fs.createWriteStream(path.resolve(__dirname, '1.mp4')));
// .on('response', function(response) {
//   // unmodified http.IncomingMessage object
//   response.on('data', function(data) {
//     // compressed data as it is received
//     console.log('received ' + data.length + ' bytes of compressed data');
//   });
// });
