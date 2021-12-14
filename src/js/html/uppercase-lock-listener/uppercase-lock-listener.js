
export default class UppercaseLockListener{
  constructor(options) {
    this.eventFn = function (e){
      let charCode = e.key.charCodeAt(0);
      console.log(charCode);
      if(charCode >= 65 && charCode <= 90 ){
        if(options && options.upCallback){
          options.upCallback();
        }
      }
      if(charCode >= 97 && charCode <= 122 ){
        if(options && options.lowCallback){
          options.lowCallback();
        }
      }
    };
    window.addEventListener('keydown', this.eventFn);
  }
  destroy(){
    window.removeEventListener('keydown', this.eventFn);
  }
}
