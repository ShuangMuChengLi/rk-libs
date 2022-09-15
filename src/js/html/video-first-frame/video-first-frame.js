export function getVideoFirstFrame(url, w = 250, h = 450) {
  return new Promise((resolve, reject) => {
    let video = document.createElement('video');
    video.autoplay = 'autoplay'; // 自动播放
    video.muted = 'muted'; // 静音
    video.src = url;
    video.crossOrigin = 'anonymous'; // 可跨域

    let canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext('2d');

    // 注册自动播放事件
    video.addEventListener('canplay', function() {
      ctx.drawImage(video, 0, 0, w, h);
      let base64 = canvas.toDataURL('image/jpeg');
      video.pause();
      resolve(base64);
      video.remove();
      canvas.remove();
    });
  });
}
