const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
console.time('t');
var stream = fs.createReadStream('D:\\linchaoqun\\soft\\ideaIU-2021.1.1.exe');
var fsHash = crypto.createHash('md5');
stream.on('end', function() {
  // fsHash.update(stack.join(''));
  var md5 = fsHash.digest('hex');
  console.log(md5);
  console.timeEnd('t');
});

stream.pipe(fsHash);

