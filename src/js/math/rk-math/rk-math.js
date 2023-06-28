export const rkMath = {
  /**
   * 获取x为底，y的对数
   * @param x
   * @param y
   * @return {number}
   */
  getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  },
  /**
   * 获取x的y次方根
   * @param x
   * @param y
   * @return {number}
   */
  getRoot(x, y) {
    return Math.pow(x, 1 / y);;
  },
  /**
   * 是否奇数
   * @param x
   * @return {boolean}
   */
  isOdd(x){
    return !!(x & 1);
  },
  /**
   *
   * @param color
   * @param a
   * @returns {string}
   */
  colorToRgba(color, a){
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color.toLowerCase();
    if(sColor && reg.test(sColor)){
      if(sColor.length === 4){
        let sColorNew = '#';
        for(let i = 1; i < 4; i += 1){
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for(let i = 1; i < 7; i += 2){
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      sColorChange.push(a || 1);
      return `RGBA(${sColorChange.join(',')})`;
    }else{
      return sColor;
    }
  }
};
