const upperCaseLetterList = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ';
const lowerCaseLetterList = 'abcdefghigklmnopqrstuvwxyz';
export default class UppercaseLockListener{
  constructor(options) {
    this.eventFn = function (e){
      let key = e.key;
      if(upperCaseLetterList.includes(key)){
        if(options && options.upCallback){
          options.upCallback();
        }
      }
      if(lowerCaseLetterList.includes(key)){
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
