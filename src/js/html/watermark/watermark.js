let waterEle;
let observerList = [];
let timer = null;
function fn(el, disableChangeCallback){
  const options = {
    childList: true,
    attributes: true,
    subtree: true,
    attributesOldValue: true,
    characterData: true,
    characterDataOldValue: true,
  };

  const callback = (records) => {
    disableChangeCallback();
  };

  const observer = new MutationObserver(callback);
  observer.observe(el, options);
  observerList.push(observer);
}
function addWatermark(settings) {
  //默认设置
  let defaultSettings = {
    watermark_txt: '',
    watermark_x: 20, //水印起始位置x轴坐标
    watermark_y: 20, //水印起始位置Y轴坐标
    watermark_rows: 20, //水印行数
    watermark_cols: 20, //水印列数
    watermark_x_space: 100, //水印x轴间隔
    watermark_y_space: 50, //水印y轴间隔
    watermark_color: '#aaa', //水印字体颜色
    watermark_alpha: 0.4, //水印透明度
    watermark_fontsize: '15px', //水印字体大小
    watermark_font: '微软雅黑', //水印字体
    watermark_width: 210, //水印宽度
    watermark_height: 80, //水印长度
    watermark_angle: 20, //水印倾斜度数
    disableChangeCallback: null
  };
  if (arguments.length === 1 && typeof arguments[0] === 'object') {
    let src = arguments[0] || {};
    for (let key in src) {
      if(!Object.hasOwnProperty.call(src, key))continue;

      if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key]) {
        continue;
      }

      if (src[key]) {
        defaultSettings[key] = src[key];
      }
    }
  }
  waterEle = document.createElement('div');
  //获取页面最大宽度
  let page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
  let cutWidth = page_width * 0.0150;
  page_width = page_width - cutWidth;
  //获取页面最大高度
  let page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);
  page_height = Math.max(page_height, window.innerHeight - 30);
  //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (defaultSettings.watermark_cols === 0 ||
    (defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1) > page_width)) {

    defaultSettings.watermark_cols = (page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space);
    defaultSettings.watermark_x_space = (page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1);
  }
  //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (defaultSettings.watermark_rows === 0 ||
    (defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1) > page_height)) {

    defaultSettings.watermark_rows = (defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space);
    defaultSettings.watermark_y_space = ((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1);
  }
  let x;
  let y;
  let k = 0;
  for (let i = 0; i < defaultSettings.watermark_rows - 1; i++) {
    y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
    for (let j = 0; j < defaultSettings.watermark_cols - 1; j++) {
      k++;
      x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;
      let mask_div = document.createElement('div');
      mask_div.id = 'mask_div' + i + j;
      mask_div.className = 'mask_div water-mark-div';
      mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
      //设置水印div倾斜显示
      mask_div.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.visibility = '';
      mask_div.style.position = 'absolute';
      mask_div.style.left = x + 'px';
      mask_div.style.top = y + 'px';
      mask_div.style.overflow = 'hidden';
      mask_div.style.zIndex = '9999';
      //让水印不遮挡页面的点击事件
      mask_div.style.pointerEvents = 'none';
      mask_div.style.opacity = defaultSettings.watermark_alpha;
      mask_div.style.fontSize = defaultSettings.watermark_fontsize;
      mask_div.style.fontFamily = defaultSettings.watermark_font;
      mask_div.style.color = defaultSettings.watermark_color;
      mask_div.style.textAlign = 'center';
      mask_div.style.width = defaultSettings.watermark_width + 'px';
      mask_div.style.height = defaultSettings.watermark_height + 'px';
      mask_div.style.display = 'block';
      waterEle.appendChild(mask_div);
      if(settings.disableChangeCallback){
        fn(mask_div, settings.disableChangeCallback);
      }
    }
  }
  document.body.appendChild(waterEle);
  if(settings.disableChangeCallback){
    fn(waterEle, settings.disableChangeCallback);
  }
  if(settings.disableChangeCallback){
    timer = setInterval(()=>{
      let allElement = document.getElementsByClassName('water-mark-div');
      if(allElement.length !== Math.floor(defaultSettings.watermark_rows) * Math.floor(defaultSettings.watermark_cols)){
        settings.disableChangeCallback();
      }
    }, 2000);
  }
}
function removeWatermark(){
  if(timer){
    clearInterval(timer);
  }
  if(observerList && observerList.length){
    for(let observer of observerList){
      observer.disconnect();
    }
  }
  observerList = [];
  timer = null;
  document.body.removeChild(waterEle);
}
export { addWatermark, removeWatermark };
