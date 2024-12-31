export class FullScreen{
  constructor(fn){
    this.fn = fn;
    document.addEventListener('webkitfullscreenchange', ()=>{
      this.fn();
    });
  }
  destroy(){
    document.removeEventListener('webkitfullscreenchange', this.fn);
  }
  getFullScreenStatus(){
    return !!(
      document.fullscreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen ||
      document.webkitFullScreen ||
      document.msFullScreen
    );
  }
  fullscreen(){
    let el = document.documentElement;
    var rfs =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullScreen,
      wscript;
    if (typeof rfs != 'undefined' && rfs) {
      rfs.call(el);
      return;
    }
    if (typeof window.ActiveXObject != 'undefined') {
      wscript = new ActiveXObject('WScript.Shell');
      if (wscript) {
        wscript.SendKeys('{F11}');
      }
    }
  }
  exitFullscreen(){
    var el = document,
      cfs =
    el.cancelFullScreen ||
    el.webkitCancelFullScreen ||
    el.mozCancelFullScreen ||
    el.exitFullScreen,
      wscript;
    if (typeof cfs != 'undefined' && cfs) {
      cfs.call(el);
      return;
    }
    if (typeof window.ActiveXObject != 'undefined') {
      wscript = new ActiveXObject('WScript.Shell');
      if (wscript != null) {
        wscript.SendKeys('{F11}');
      }
    }
  }
}