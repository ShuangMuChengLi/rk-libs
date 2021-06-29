function H5sPlayerWS(t) {
  var s;
  this.sourceBuffer, this.buffer = [], this.t, this.s, this.i, this.o, this.h, this.l = 0, this.u = 0, this.S = 0, this.v = !1, this.p = !1, this.H = !1, this.k, this.P = t, console.log('Websocket Conf:', t), this.C = t.videoid, this.W = t.pbconf, this.m = t.token, void 0 === this.C ? (this.R = t.videodom, console.log(t.token, 'use dom directly')) : (this.R = document.getElementById(this.C), console.log(t.token, 'use videoid')), this.s = this.R, null != this.W && 'false' === this.W.showposter || (s = this.P.protocol + '//' + this.P.host + this.P.rootpath + 'api/v1/GetImage?token=' + this.m + '&session=' + this.P.session, console.log(t.token, 'connect src'), this.R.setAttribute('poster', s));
}

function H5sPlayerRTC(t) {
  var s;
  this.i, this.o, this.h, this.l = 0, this.u = 0, this.S = 0, this.v = !1, this.p = !1, this.P = t, this.C = t.videoid, this.W = t.pbconf, this.m = t.token, void 0 === this.C ? (this.R = t.videodom, console.log(t.token, 'use dom directly')) : (this.R = document.getElementById(this.C), console.log(t.token, 'use videoid')), this.s = this.R, this.I = null, this.A = {optional: [{DtlsSrtpKeyAgreement: !0}]}, this.T = {
    mandatory: {
      offerToReceiveAudio: !0,
      offerToReceiveVideo: !0
    }
  }, this.M = {O: []}, this.J = [], null != this.W && 'false' === this.W.showposter || (s = this.P.protocol + '//' + this.P.host + this.P.rootpath + 'api/v1/GetImage?token=' + this.m + '&session=' + this.P.session, console.log('connect src', t.token), this.R.setAttribute('poster', s));
}

function createRTCSessionDescription(t) {
  return console.log('createRTCSessionDescription '), new RTCSessionDescription(t);
}

function H5sPlayerHls(t) {
  this.i, this.h, this.P = t, this.C = t.videoid, this.m = t.token, this.N, this.g = t.hlsver, void 0 === this.C ? (this.R = t.videodom, console.log(t.token, 'use dom directly')) : (this.R = document.getElementById(this.C), console.log(t.token, 'use videoid')), this.B = this.R, this.B.type = 'application/x-mpegURL', this.U = 0, this._ = 0;
  var s = this.P.protocol + '//' + window.location.host + '/api/v1/GetImage?token=' + this.m + '&session=' + this.P.session;
  this.R.setAttribute('poster', s);
}

function H5sPlayerAudio(t) {
  this.buffer = [], this.i, this.v = !1, this.p = !1, this.P = t, console.log('Aduio Player Conf:', t), this.m = t.token, this.L = new AudioContext;
}

function H5sPlayerAudBack(t) {
  this.buffer = [], this.i, this.v = !1, this.p = !1, this.P = t, this.D = 0, console.log('Aduio Back Conf:', t), this.m = t.token, this.L = new AudioContext;
}

function float32ToInt16(t) {
  for (let l = t.length, buf = new Int16Array(l); l--;) buf[l] = 32767 * Math.min(1, t[l]);
  return buf;
}

H5sPlayerWS.prototype.G = function () {
  !0 === this.v && (console.log('Reconnect...'), this.K(this.m), this.v = !1);
}, H5sPlayerWS.prototype.V = function (t) {
  var s;
  console.log('H5SWebSocketClient');
  try {
    'http:' === this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)), 'https:' === this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)), console.log(this.P.host);
  } catch (t) {
    return void alert('error');
  }
  return s;
}, H5sPlayerWS.prototype.j = function () {
  if (null !== this.sourceBuffer && void 0 !== this.sourceBuffer) {
    if (0 !== this.buffer.length && !this.sourceBuffer.updating) try {
      var t = this.buffer.shift(), s = new Uint8Array(t);
      this.sourceBuffer.appendBuffer(s);
    } catch (t) {
      console.log(t);
    }
  } else console.log(this.sourceBuffer, 'is null or undefined');
}, H5sPlayerWS.prototype.q = function () {
  try {
    var t = {cmd: 'H5_KEEPALIVE'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerWS.prototype.F = function (t) {
  return t.data, ArrayBuffer, 'string' === typeof t.data ? (console.log('string'), void (null != this.W && null != this.W.callback && this.W.callback(t.data, this.W.userdata))) : !0 !== this.p ? !1 === this.H ? (this.k = String.fromCharCode.apply(null, new Uint8Array(t.data)), this.X(this), void (this.H = !0)) : (this.buffer.push(t.data), void this.j()) : void 0;
}, H5sPlayerWS.prototype.X = function (t) {
  try {
    window.MediaSource = window.MediaSource || window.WebKitMediaSource, window.MediaSource || console.log('MediaSource API is not available');
    var s = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    'MediaSource' in window && MediaSource.isTypeSupported(s) ? console.log('MIME type or codec: ', s) : console.log('Unsupported MIME type or codec: ', s), t.t = new window.MediaSource, t.s.autoplay = !0, console.log(t.C);
    t.s.src = window.URL.createObjectURL(t.t), t.s.play(), t.t.addEventListener('sourceopen', t.Y.bind(t), !1);
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerWS.prototype.Y = function () {
  console.log('Add SourceBuffer'), this.sourceBuffer = this.t.addSourceBuffer(this.k), this.t.duration = 1 / 0, this.t.removeEventListener('sourceopen', this.Y, !1), this.sourceBuffer.addEventListener('updateend', this.j.bind(this), !1);
}, H5sPlayerWS.prototype.K = function (t) {
  this.s.autoplay = !0;
  var s = 'api/v1/h5swsapi', e = 'main';
  if (void 0 === this.P.streamprofile || (e = this.P.streamprofile), void 0 === this.W) s = this.P.rootpath + s + '?token=' + t + '&profile=' + e + '&session=' + this.P.session; else {
    var i = 'false', o = 'fake';
    void 0 === this.W.serverpb || (i = this.W.serverpb), void 0 === this.W.filename || (o = this.W.filename), s = this.P.rootpath + s + '?token=' + t + '&playback=true&profile=' + e + '&serverpb=' + i + '&begintime=' + encodeURIComponent(this.W.begintime) + '&endtime=' + encodeURIComponent(this.W.endtime) + '&filename=' + o + '&session=' + this.P.session;
  }
  this.P.session, console.log(s), this.i = this.V(s), console.log('setupWebSocket', this.i), this.i.binaryType = 'arraybuffer', (this.i.Z = this).i.onmessage = this.F.bind(this), this.i.onopen = function () {
    console.log('wsSocket.onopen', this.Z), this.Z.o = setInterval(this.Z.$.bind(this.Z), 1e4), this.Z.h = setInterval(this.Z.q.bind(this.Z), 1e3), null != this.Z.W && 'true' === this.Z.W.autoplay && this.Z.start();
  }, this.i.onclose = function () {
    console.log('wsSocket.onclose', this.Z), !0 === this.Z.p ? console.log('wsSocket.onclose disconnect') : this.Z.v = !0, this.Z.tt(this.Z), this.Z.st(this.Z), this.Z.k = '', this.Z.H = !1;
  };
}, H5sPlayerWS.prototype.tt = function (t) {
  console.log('Cleanup Source Buffer', t);
  try {
    t.sourceBuffer.removeEventListener('updateend', t.j, !1), t.sourceBuffer.abort(), document.documentMode || /Edge/.test(navigator.userAgent) ? console.log('IE or EDGE!') : t.t.removeSourceBuffer(t.sourceBuffer), t.sourceBuffer = null, t.t = null, t.buffer = [];
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerWS.prototype.st = function (t) {
  console.log('CleanupWebSocket', t), clearInterval(t.h), clearInterval(t.o), t.l = 0, t.u = 0, t.S = 0;
}, H5sPlayerWS.prototype.$ = function () {
  if (void 0 === this.W) {
    !0 === this.p && (console.log('CheckSourceBuffer has been disconnect', this), clearInterval(this.h), clearInterval(this.o), clearInterval(this.et));
    try {
      if (console.log('CheckSourceBuffer', this), this.sourceBuffer.buffered.length <= 0) {
        if (this.l++, 8 < this.l) return console.log('CheckSourceBuffer Close 1'), void this.i.close();
      } else {
        this.l = 0;
        this.sourceBuffer.buffered.start(0);
        var t = this.sourceBuffer.buffered.end(0), s = t - this.s.currentTime;
        if (5 < s || s < 0) return console.log('CheckSourceBuffer Close 2', s), void this.i.close();
        if (t === this.u) {
          if (this.S++, 3 < this.S) return console.log('CheckSourceBuffer Close 3'), void this.i.close();
        } else this.S = 0;
        this.u = t;
      }
    } catch (t) {
      console.log(t);
    }
  }
}, H5sPlayerWS.prototype.connect = function () {
  this.K(this.m), this.et = setInterval(this.G.bind(this), 3e3);
}, H5sPlayerWS.prototype.disconnect = function () {
  console.log('disconnect', this), this.p = !0, clearInterval(this.et), null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this);
}, H5sPlayerWS.prototype.start = function () {
  try {
    var t = {cmd: 'H5_START'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerWS.prototype.pause = function () {
  try {
    var t = {cmd: 'H5_PAUSE'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerWS.prototype.resume = function () {
  try {
    var t = {cmd: 'H5_RESUME'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerWS.prototype.seek = function (t) {
  try {
    var s = {cmd: 'H5_SEEK'};
    s.nSeekTime = t, this.i.send(JSON.stringify(s));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerWS.prototype.speed = function (t) {
  try {
    var s = {cmd: 'H5_SPEED'};
    s.nSpeed = t, this.i.send(JSON.stringify(s));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerRTC.prototype.G = function () {
  !0 === this.v && (console.log('Reconnect...'), this.K(this.m), this.v = !1);
}, H5sPlayerRTC.prototype.V = function (t) {
  var s;
  console.log('H5SWebSocketClient');
  try {
    'http:' === this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)), 'https:' === this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)), console.log(this.P.host);
  } catch (t) {
    return void alert('error');
  }
  return s;
}, H5sPlayerRTC.prototype.q = function () {
  try {
    var t = {type: 'keepalive'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerRTC.prototype.it = function (t) {
  if (t.candidate) {
    var s;
    console.log('onIceCandidate currentice', t.candidate), s = t.candidate, console.log('onIceCandidate currentice', s, JSON.stringify(s));
    var e = JSON.parse(JSON.stringify(s));
    e.type = 'remoteice', console.log('onIceCandidate currentice new', e, JSON.stringify(e)), this.i.send(JSON.stringify(e));
  } else console.log('End of candidates.');
}, H5sPlayerRTC.prototype.ot = function (t) {
  var s;
  console.log('Remote track added:' + JSON.stringify(t)), s = t.nt ? t.nt[0] : t.stream;
  var e = this.R;
  e.src = URL.createObjectURL(s), e.play();
}, H5sPlayerRTC.prototype.ht = function () {
  console.log('createPeerConnection  config: ' + JSON.stringify(this.M) + ' option:' + JSON.stringify(this.A));
  var s = new RTCPeerConnection(this.M, this.A), e = this;
  return s.onicecandidate = function (t) {
    e.it.call(e, t);
  }, void 0 !== s.ct ? s.ct = function (t) {
    e.ot.call(e, t);
  } : s.onaddstream = function (t) {
    e.ot.call(e, t);
  }, s.oniceconnectionstatechange = function (t) {
    console.log('oniceconnectionstatechange  state: ' + s.iceConnectionState);
  }, console.log('Created RTCPeerConnnection with config: ' + JSON.stringify(this.M) + 'option:' + JSON.stringify(this.A)), s;
}, H5sPlayerRTC.prototype.rt = function (t) {
  console.log('ProcessRTCOffer', t);
  try {
    this.I = this.ht(), this.J.length = 0;
    var s = this;
    this.I.setRemoteDescription(createRTCSessionDescription(t)), this.I.createAnswer(this.T).then(function (t) {
      console.log('Create answer:' + JSON.stringify(t)), s.I.setLocalDescription(t, function () {
        console.log('ProcessRTCOffer createAnswer', t), s.i.send(JSON.stringify(t));
      }, function () {
      });
    }, function (t) {
      alert('Create awnser error:' + JSON.stringify(t));
    });
  } catch (t) {
    this.disconnect(), alert('connect error: ' + t);
  }
}, H5sPlayerRTC.prototype.lt = function (t) {
  console.log('ProcessRemoteIce', t);
  try {
    var s = new RTCIceCandidate({sdpMLineIndex: t.sdpMLineIndex, candidate: t.candidate});
    console.log('ProcessRemoteIce', s), console.log('Adding ICE candidate :' + JSON.stringify(s)), this.I.addIceCandidate(s, function () {
      console.log('addIceCandidate OK');
    }, function (t) {
      console.log('addIceCandidate error:' + JSON.stringify(t));
    });
  } catch (t) {
    alert('connect ProcessRemoteIce error: ' + t);
  }
}, H5sPlayerRTC.prototype.F = function (t) {
  t.data, ArrayBuffer, t.data, console.log('RTC received ', t.data);
  var s = JSON.parse(t.data);
  return console.log('Get Message type ', s.type), 'offer' === s.type ? (console.log('Process Message type ', s.type), void this.rt(s)) : 'remoteice' === s.type ? (console.log('Process Message type ', s.type), void this.lt(s)) : void (null != this.W && null != this.W.callback && this.W.callback(t.data, this.W.userdata));
}, H5sPlayerRTC.prototype.K = function (t) {
  this.s.autoplay = !0;
  var s = 'api/v1/h5srtcapi', e = 'main';
  if (void 0 === this.P.streamprofile || (e = this.P.streamprofile), void 0 === this.W) s = this.P.rootpath + s + '?token=' + t + '&profile=' + e + '&session=' + this.P.session; else {
    var i = 'false', o = 'fake';
    void 0 === this.W.serverpb || (i = this.W.serverpb), void 0 === this.W.filename || (o = this.W.filename), s = this.P.rootpath + s + '?token=' + t + '&playback=true&profile=' + e + '&serverpb=' + i + '&begintime=' + encodeURIComponent(this.W.begintime) + '&endtime=' + encodeURIComponent(this.W.endtime) + '&filename=' + o + '&session=' + this.P.session;
  }
  console.log(s), this.i = this.V(s), console.log('setupWebSocket', this.i), this.i.binaryType = 'arraybuffer', (this.i.Z = this).i.onmessage = this.F.bind(this), this.i.onopen = function () {
    console.log('wsSocket.onopen', this.Z);
    var t = {type: 'open'};
    this.Z.i.send(JSON.stringify(t)), this.Z.h = setInterval(this.Z.q.bind(this.Z), 1e3), null != this.Z.W && 'true' === this.Z.W.autoplay && this.Z.start();
  }, this.i.onclose = function () {
    console.log('wsSocket.onclose', this.Z), !0 === this.Z.p ? console.log('wsSocket.onclose disconnect') : this.Z.v = !0, this.Z.st(this.Z);
  };
}, H5sPlayerRTC.prototype.st = function (t) {
  console.log('CleanupWebSocket', t), clearInterval(t.h), t.l = 0, t.u = 0, t.S = 0;
}, H5sPlayerRTC.prototype.connect = function () {
  this.K(this.m), this.et = setInterval(this.G.bind(this), 3e3);
}, H5sPlayerRTC.prototype.disconnect = function () {
  console.log('disconnect', this), this.p = !0, clearInterval(this.et), null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this);
}, H5sPlayerRTC.prototype.start = function () {
  try {
    var t = {cmd: 'H5_START'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerRTC.prototype.pause = function () {
  try {
    var t = {cmd: 'H5_PAUSE'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerRTC.prototype.resume = function () {
  try {
    var t = {cmd: 'H5_RESUME'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerRTC.prototype.seek = function (t) {
  try {
    var s = {cmd: 'H5_SEEK'};
    s.nSeekTime = t, this.i.send(JSON.stringify(s));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerRTC.prototype.speed = function (t) {
  try {
    var s = {cmd: 'H5_SPEED'};
    s.nSpeed = t, this.i.send(JSON.stringify(s));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerHls.prototype.V = function (t) {
  var s;
  console.log('H5SWebSocketClient');
  try {
    'http:' === this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)), 'https:' === this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)), console.log(this.P.host);
  } catch (t) {
    return void alert('error');
  }
  return s;
}, H5sPlayerHls.prototype.q = function () {
  try {
    var t = {type: 'keepalive'};
    this.i.send(JSON.stringify(t));
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerHls.prototype.F = function (t) {
  console.log('HLS received ', t.data);
}, H5sPlayerHls.prototype.K = function (t) {
  var s = 'api/v1/h5swscmnapi';
  s = this.P.rootpath + s + '?token=' + t + '&session=' + this.P.session, console.log(s), this.i = this.V(s), console.log('setupWebSocket', this.i), this.i.binaryType = 'arraybuffer', (this.i.Z = this).i.onmessage = this.F.bind(this), this.i.onopen = function () {
    console.log('wsSocket.onopen', this.Z), this.Z.h = setInterval(this.Z.q.bind(this.Z), 1e3);
  }, this.i.onclose = function () {
    console.log('wsSocket.onclose', this.Z), this.Z.st(this.Z);
  };
}, H5sPlayerHls.prototype.st = function (t) {
  console.log('H5sPlayerHls CleanupWebSocket', t), clearInterval(t.h);
}, H5sPlayerHls.prototype.at = function () {
  console.log('HLS video.ended', this.B.ended), console.log('HLS video.currentTime', this.B.currentTime);
  var t = this.B.currentTime, s = t - this.U;
  console.log('HLS diff', s), 0 === s && this._++, this.U = t, 3 < this._ && (null != this.i && (this.i.close(), this.i = null), this.K(this.m), console.log('HLS reconnect'), this.B.src = '', this.U = 0, this._ = 0, this.B.src = this.P.protocol + '//' + this.P.host + this.P.rootpath + 'hls/' + this.g + '/' + this.m + '/hls.m3u8', this.B.play());
}, H5sPlayerHls.prototype.connect = function () {
  this.K(this.m), this.U = 0, this._ = 0, this.B.onended = function (t) {
    console.log('The End');
  }, this.B.onpause = function (t) {
    console.log('Pause');
  }, this.B.onplaying = function (t) {
    console.log('Playing');
  }, this.B.onseeking = function (t) {
    console.log('seeking');
  }, this.B.onvolumechange = function (t) {
    console.log('volumechange');
  }, this.B.src = this.P.protocol + '//' + this.P.host + this.P.rootpath + 'hls/' + this.g + '/' + this.m + '/hls.m3u8', this.B.play(), this.N = setInterval(this.at.bind(this), 3e3);
}, H5sPlayerHls.prototype.disconnect = function () {
  clearInterval(this.N), this.U = 0, this._ = 0, null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this);
}, H5sPlayerAudio.prototype.V = function (t) {
  var s;
  console.log('H5SWebSocketClient');
  try {
    'http:' === this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)), 'https:' === this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)), console.log(this.P.host);
  } catch (t) {
    return void alert('error');
  }
  return s;
}, H5sPlayerAudio.prototype.q = function () {
  try {
    this.i.send('keepalive');
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerAudio.prototype.F = function (t) {
  for (var s = new Int16Array(t.data), e = s.length, i = this.L.createBuffer(1, e, 8e3), o = 0; o < 1; o++) for (var n = i.getChannelData(o), h = 0; h < e; h++) n[h] = s[h] / 16383.5;
  var c = this.L.createBufferSource();
  c.buffer = i, c.connect(this.L.destination), c.start();
}, H5sPlayerAudio.prototype.st = function (t) {
  console.log('CleanupWebSocket', t), clearInterval(t.h);
}, H5sPlayerAudio.prototype.K = function (t) {
  var s = 'api/v1/h5saudapi';
  s = this.P.rootpath + s + '?token=' + t + '&session=' + this.P.session, console.log(s), this.i = this.V(s), console.log('setupWebSocket for audio', this.i), this.i.binaryType = 'arraybuffer', (this.i.Z = this).i.onmessage = this.F.bind(this), this.i.onopen = function () {
    console.log('wsSocket.onopen', this.Z), this.Z.h = setInterval(this.Z.q.bind(this.Z), 1e3);
  }, this.i.onclose = function () {
    console.log('wsSocket.onclose', this.Z), this.Z.st(this.Z);
  };
}, H5sPlayerAudio.prototype.connect = function () {
  this.K(this.m);
}, H5sPlayerAudio.prototype.disconnect = function () {
  console.log('disconnect', this), null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this);
}, H5sPlayerAudBack.prototype.V = function (t) {
  var s;
  console.log('H5SWebSocketClient');
  try {
    'http:' === this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)), 'https:' === this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)), console.log(this.P.host);
  } catch (t) {
    return void alert('error');
  }
  return s;
}, H5sPlayerAudBack.prototype.q = function () {
  try {
    this.i.send('keepalive');
  } catch (t) {
    console.log(t);
  }
}, H5sPlayerAudBack.prototype.F = function (t) {
}, H5sPlayerAudBack.prototype.st = function (t) {
  console.log('CleanupWebSocket', t), clearInterval(t.h);
}, H5sPlayerAudBack.prototype.ut = function (t) {
  console.log('wsSocket.onopen', this);
  try {
    navigator.getUserMedia({s: !1, dt: !0}, this.ft.bind(this));
  } catch (t) {
    return void alert('Audio intecomm error', t);
  }
}, H5sPlayerAudBack.prototype.K = function (t) {
  var s = 'api/v1/h5saudbackapi';
  s = this.P.rootpath + s + '?token=' + t + '&session=' + this.P.session, console.log(s), this.i = this.V(s), console.log('setupWebSocket for audio back', this.i), this.i.binaryType = 'arraybuffer', (this.i.Z = this).i.onmessage = this.F.bind(this), this.i.onopen = this.ut.bind(this), this.i.onclose = function () {
    console.log('wsSocket.onclose', this.Z), this.Z.st(this.Z);
  };
}, H5sPlayerAudBack.prototype.St = function (t) {
  var s = float32ToInt16(t.inputBuffer.getChannelData(0));
  this.i.send(s);
}, H5sPlayerAudBack.prototype.ft = function (t) {
  try {
    var s = this.L.createMediaStreamSource(t);
    console.log('sampleRate', this.L.sampleRate);
    var e = this.L.createScriptProcessor(256, 1, 1);
    s.connect(e), e.connect(this.L.destination), e.onaudioprocess = this.St.bind(this);
  } catch (t) {
    return void alert('Audio intecomm error', t);
  }
}, H5sPlayerAudBack.prototype.connect = function () {
  this.K(this.m);
}, H5sPlayerAudBack.prototype.disconnect = function () {
  console.log('disconnect', this), null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this);
};
export {
  H5sPlayerWS, H5sPlayerRTC
};
