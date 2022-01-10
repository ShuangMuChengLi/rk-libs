export class TamperProtector{
  /**
   * 构造函数，创建栈，并设置定时器
   */
  constructor () {
    this.observerList = [];
    this.timer = setInterval(()=>{
      for(let item of this.observerList){
        if(!item.el.offsetParent){
          window.location.reload();
          return;
        }
      }
    }, 500);
  }
  destroy(){
    clearInterval(this.timer);
    for(let item of this.observerList){
      item.observer.disconnect();
    }
  }
  add(ele){
    let target;
    if(typeof ele === 'string'){
      target = document.querySelector(ele);
    }else{
      target = ele;
    }
    this.addObserver(target);
  }

  /**
   * 监听关键元素是否被修改
   * @param el
   */
  addObserver(el){
    const options = {
      childList: true,
      attributes: true,
      subtree: true,
      attributesOldValue: true,
      characterData: true,
      characterDataOldValue: true,
    };

    const callback = () => {
      window.location.reload();
    };

    const observer = new MutationObserver(callback);
    observer.observe(el, options);
    this.observerList.push({
      observer,
      el
    });
  }
}
