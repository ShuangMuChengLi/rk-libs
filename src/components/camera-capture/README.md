# 浏览器拍照+人脸识别

## preview

## download
[解决方案下载](./components/camera-capture.zip)

## dependence
Vue.js 
下载依赖 `npm i tracking -S`

## Attributes

## event


## usage
```vue
<template>
  <div class="testTracking">
    <video
      id="video"
      width="1000"
      height="700"
      preload
      autoplay
      loop
      muted
    />
    <canvas
      id="canvas"
      width="1000"
      height="700"
    />
    <div class="buttonDiv">
      <button
        type="button"
        style="font-size: 3vw;"
        @click="submit"
      >
        提取照片
      </button>
      <button
        type="button"
        name="button"
        style="font-size: 3vw;"
        @click="checkFace"
      >
        检测人脸
      </button>
      <button
        type="button"
        name="button"
        style="font-size: 3vw;"
        @click="getCompetence"
      >
        打开摄像头
      </button>
      <button
        type="button"
        name="button"
        style="font-size: 3vw;"
        @click="de"
      >
        停
      </button>
    </div>
  </div>
</template>

<script>
require('tracking/build/tracking-min.js');
require('tracking/build/data/face-min.js');
require('tracking/build/data/mouth-min.js');
require('tracking/examples/assets/stats.min.js');
export default {
  name: 'CameraCaptureDemo',
  data() {
    return {};
  },
  destroyed() {
    // 停止侦测
    this.trackerTask.stop();
    // 关闭摄像头
    this.trackerTask.closeCamera();
  },
  methods: {
    checkFace() {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      this.trackerTask = tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {
        if (event.data.length <= 0) {
          return;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = '#fff';
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
      });
    },
    submit() {
      const that = this;
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      const video = document.getElementById('video');
      context.drawImage(video, 0, 0, 1000, 700);
      canvas.toBlob((blob) => {
        // axios.post({ faceUrl: URL.createObjectURL(blob) }).then((res) => {
        //   console.log("上传成功");
        // });
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        console.log(reader);
      });
      const url = canvas.toDataURL('image/png');
      this.downLoad(url);
    },
    downLoad(url) {
      var oA = document.createElement('a');
      oA.download = '';// 设置下载的文件名，默认是'下载'
      oA.href = url;
      document.body.appendChild(oA);
      oA.click();
      oA.remove(); // 下载之后把创建的元素删除
    },
    getCompetence() {
      var _this = this;
      this.thisCancas = document.getElementById('canvas');
      this.thisContext = this.thisCancas.getContext('2d');
      this.thisVideo = document.getElementById('video');
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(
              new Error('getUserMedia is not implemented in this browser')
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: 'scaleX(-1)'
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play();
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    de() {
      // 停止侦测
      this.trackerTask.stop();
      // 关闭摄像头
      this.trackerTask.closeCamera();
    }
  }
};
</script>

<style lang="less" scoped>
    .testTracking {
        height: 100vh;
        width: 100%;
        position: relative;
        > * {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
        }
        video,
        canvas {
            top: 0;
        }
        .buttonDiv {
            bottom: 10px;
        }
    }
</style>
```



