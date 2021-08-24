# 录音，并下载或上传
## demo
[预览](./index.html#/demo/recorderjs)
## website
[官网](https://github.com/jergason/Recorderjs.git)
## info
通过改造库文件，使得其支持es6语法
## download
[方案代码下载](./experience/html/recorderjs.zip)
## usage
```
<template>
  <div>
    <h1>Recorder.js simple WAV export example</h1>

    <p>Make sure you are using a recent version of Google Chrome, at the moment this only works with Google Chrome Canary.</p>
    <p>Also before you enable microphone input either plug in headphones or turn the volume down if you want to avoid ear splitting feedback!</p>
    <el-button @click="init">
      init
    </el-button>
    <button @click="startRecording">
      record
    </button>
    <button @click="stopRecording">
      stop
    </button>

    <h2>Recordings</h2>
    <ul id="recordingslist" />

    <h2>Log</h2>
    <pre id="log" />
    <div>结果：{{ result }}</div>
  </div>
</template>

<script>
import { Recorder } from '@/experience/html/recorderjs/lib/recorder';
// import { axios } from '@/js/tools/axios';
// import { fileHeader } from '../../../config/api-config';
// const Recorder = require('./recorder');
var audioContext;
export default {
  name: 'RecorderTest',
  components: {},
  data () {
    return {
      recorder: null,
      result: ''
    };
  },
  mounted () {

  },
  methods: {
    /**
     * 初始化
     */
    init(){
      // try {
      //   // webkit shim
      //   window.AudioContext = window.AudioContext || window.webkitAudioContext;
      //   // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      //   window.URL = window.URL || window.webkitURL;

      audioContext = new AudioContext();
      //   console.log('Audio context set up.');
      //   console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
      // } catch (e) {
      //   alert('No web audio support in this browser!');
      // }

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream)=>{
        this.startUserMedia(stream);
      })
        .catch((err)=>{
        /* 处理error */
          console.error(err);
        });
    },
    /**
     * 初始化Recorder
     * @param stream
     */
    startUserMedia(stream) {
      console.log(this);
      var input = audioContext.createMediaStreamSource(stream);
      console.log('Media stream created.');

      // input.connect(audioContext.destination);
      // console.log('Input connected to audio context destination.');

      this.recorder = new Recorder(input);
      console.log('Recorder initialised.');
    },
    /**
     * 开始录音
     * @param button
     */
    startRecording(button) {
      this.recorder && this.recorder.record();
      // button.disabled = true;
      // button.nextElementSibling.disabled = false;
      console.log('Recording...');
    },
    /**
     * 结束录音
     * @param button
     */
    stopRecording(button) {
      this.recorder && this.recorder.stop();
      // button.disabled = true;
      // button.previousElementSibling.disabled = false;
      console.log('Stopped recording.');

      // create WAV download link using audio data blob
      this.createDownloadLink();

      this.recorder && this.recorder.clear();
    },
    /**
     * 下载录音，并上传
     */
    createDownloadLink() {
      this.recorder && this.recorder.exportWAV((blob)=>{
        var url = URL.createObjectURL(blob);
        var li = document.createElement('li');
        var au = document.createElement('audio');
        var hf = document.createElement('a');

        au.controls = true;
        au.src = url;
        hf.href = url;
        hf.download = new Date().toISOString() + '.wav';
        hf.innerHTML = hf.download;
        li.appendChild(au);
        li.appendChild(hf);
        document.getElementById('recordingslist').appendChild(li);
        const formData = new FormData();
        formData.append('file', blob, 'file.wav');
        // axios.post('http://localhost:3000/file', formData, fileHeader).then((data)=>{
        //   console.log(data);
        //   this.result = data.data;
        // });
      });
    }
  }
};
</script>

<style scoped lang="less">
ul { list-style: none; }
#recordingslist audio { display: block; margin-bottom: 10px; }
</style>

```
