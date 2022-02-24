# 视频工具类ffmpeg（转码、水印等），及其node工具包ffmpeg-static
ffmpeg可以实现视频流、文件的转码、加水印、截取等等操作。ffmpeg-static是ffmpeg的Node工具包
## ffmpeg的视频转码命令案例
```
ffmpeg -i 1.mp4 -qscale 1 1.avi
```
## ffmpeg的视频转码命令的node工具包ffmpeg-static实现代码
```
const {resolve} = require('path');
const shell = require('any-shell-escape');
const {exec} = require('child_process');
const pathToFfmpeg = require('ffmpeg-static');

const makeMp3 = shell([
  pathToFfmpeg,
  '-i', resolve(__dirname, '1.mp4'),
  '-qscale', '1',
  resolve(__dirname, '1.avi'),
]);

exec(makeMp3, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.info('done!');
  }
});
```
