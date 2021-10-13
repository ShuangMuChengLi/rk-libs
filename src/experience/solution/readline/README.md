# Node.js逐行读取文件
## package
核心是用到了Node.js的readline模块  
Node.js的readline模块读取文件    
读取表单中的文件用到了formidable模块  
对文件编码格式进行判断用到了chardet模块  
对GBK转码用到了iconv-lite模块  
基于express的代码入下  
### usage
```
var formidable = require('formidable');
var fs = require('fs');
var stream = require('stream');
let chardet = require('chardet');
let path = require('path');
let iconv = require('iconv-lite');
var root = __dirname;
let temPath = path.join(root, '../tem');
let uploadPath = path.join(root, '../upload');
let readline = require('readline');
try {
  require('fs').mkdirSync(temPath);
  require('fs').mkdirSync(uploadPath);
} catch (e) {
  if (e.code !== 'EEXIST') {
    log.error('Could not set up log directory, error was: ', e);
    console.error('Could not set up log directory, error was: ', e);
    process.exit(1);
  }
}
var upload = function (req,res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = temPath;
  form.parse(req,function(err , fields , files){
    chardet.detectFile(files.file.path, function(err, encoding) {
      let isGBK = false;
      if(encoding === 'Big5' || encoding === 'GB18030' ){
        isGBK = true;
      }
      fs.readFile(files.file.path, function (err,data) {
        if(isGBK){
          data = iconv.decode(data,'gbk');
        }
        let baseData = new Buffer.from(data);
        let filePath = path.join(uploadPath , files.file.name);
        // fs.writeFile(filePath, baseData, (err) => {
        //   if (err) throw err;
        //   console.log('It\'s saved!' + filePath);
        // });
        var bufferStream = new stream.PassThrough();
        bufferStream.end(baseData);
        var objReadline = readline.createInterface({
          input:bufferStream
        });
        var arr = [];
        objReadline.on('line',function (line) {
          arr.push(line);
          //console.log('line:'+ line);
        });
        objReadline.on('close',function () {
          // console.log(arr);
          console.log(arr);
        });
        res.end('upload complete');
      });

    });

  });
};
module.exports = upload;

```
