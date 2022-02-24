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
