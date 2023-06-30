const { jsPDF } = require('jspdf'); // will automatically load the node version
const fs = require('fs'); // will automatically load the node version
const path = require('path');
const doc = new jsPDF();

// const file = fs.readFileSync(path.resolve(__dirname, 'simkai.ttf'));
// const buffer = new Buffer(file, 'binary');
// const base = buffer.toString('base64');
// add the font to jsPDF
// doc.addFileToVFS('MyFont.ttf', base);
doc.addFont(path.resolve(__dirname, 'simkai.ttf'), 'MyFont', 'normal');
doc.setFont('MyFont');
doc.text('爱我中华!', 10, 10);
doc.save('a4.pdf'); // will save the file in the current working directory
