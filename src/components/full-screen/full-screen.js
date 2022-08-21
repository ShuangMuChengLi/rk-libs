Object.defineProperty(exports, '__esModule', { value: true });
var DOC_EL = document.documentElement;
var TYPE_REQUEST_FULL_SCREEN = 'requestFullscreen';
var TYPE_EXIT_FULL_SCREEN = 'exitFullscreen';
var TYPE_FULL_SCREEN_ELEMENT = 'fullscreenElement';
var TYPE_ON_FULL_SCREEN_CHANGE = 'onfullscreenchange';
if ('webkitRequestFullScreen' in DOC_EL) {
  TYPE_REQUEST_FULL_SCREEN = 'webkitRequestFullScreen';
  TYPE_EXIT_FULL_SCREEN = 'webkitExitFullscreen';
  TYPE_FULL_SCREEN_ELEMENT = 'webkitFullscreenElement';
  TYPE_ON_FULL_SCREEN_CHANGE = 'onwebkitfullscreenchange';
}
else if ('msRequestFullscreen' in DOC_EL) {
  TYPE_REQUEST_FULL_SCREEN = 'msRequestFullscreen';
  TYPE_EXIT_FULL_SCREEN = 'msExitFullscreen';
  TYPE_FULL_SCREEN_ELEMENT = 'msFullscreenElement';
  TYPE_ON_FULL_SCREEN_CHANGE = 'MSFullscreenChange';
}
else if ('mozRequestFullScreen' in DOC_EL) {
  TYPE_REQUEST_FULL_SCREEN = 'mozRequestFullScreen';
  TYPE_EXIT_FULL_SCREEN = 'mozCancelFullScreen';
  TYPE_FULL_SCREEN_ELEMENT = 'mozFullScreenElement';
  TYPE_ON_FULL_SCREEN_CHANGE = 'onmozfullscreenchange';
}
else if (!('requestFullscreen' in DOC_EL)) {
  throw '\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301Fullscreen API !';
}
function getCurrentElement(el) {
  return el instanceof HTMLElement ? el : DOC_EL;
}
function beFull(el, options) {
  return getCurrentElement(el)[TYPE_REQUEST_FULL_SCREEN](options);
}
exports.beFull = beFull;
function exitFull() {
  return document[TYPE_EXIT_FULL_SCREEN]();
}
exports.exitFull = exitFull;
function isFull(el) {
  return getCurrentElement(el) === document[TYPE_FULL_SCREEN_ELEMENT];
}
exports.isFull = isFull;
function toggleFull(el, options) {
  if (isFull(el)) {
    return exitFull();
  }
  else {
    return beFull(el, options);
  }
}
exports.toggleFull = toggleFull;
//# sourceMappingURL=main.js.map
