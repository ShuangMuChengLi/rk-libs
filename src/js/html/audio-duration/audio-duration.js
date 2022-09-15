export function getAudioDuration(url) {
  return new Promise((resolve, reject) => {
    // js
    let audio = new Audio(); // document.createElement('audio');
    audio.src = url;
    audio.addEventListener('canplay', () => {
      if(audio.duration && audio.duration !== Infinity){
        resolve(Math.floor(audio.duration));
      }
      audio.remove();
    });

    // uni-app
    // let audioObj = uni.createInnerAudioContext();
    // audioObj.src = url;
    // audioObj.onCanplay(() => {
    //   resolve(Math.floor(audio.duration));
    //   audioObj.destroy();
    // });
  });
}