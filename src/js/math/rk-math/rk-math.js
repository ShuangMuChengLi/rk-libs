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
   * 是否奇数
   * @param x
   * @return {boolean}
   */
  isOdd(x){
    return !!(x & 1);
  },
};
