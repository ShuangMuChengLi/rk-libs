const fs = require('fs');
const path = require('path');
let stat = fs.statSync(path.resolve(__dirname, 'chunks-test.mp4'));
console.log(stat);
