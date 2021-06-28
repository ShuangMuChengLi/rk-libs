/**
 * 二维数组穷尽组合游标算法函数
 * @param list  [ ['a1','a2'], ['b1','b2']...]
 * @return {any[]}  [ [ 'a1', 'b1' ...], [ 'a1', 'b2' ...], [ 'a2', 'b1'... ], [ 'a2', 'b2'... ]... ]
 * 1、计算出所有组合的长度length，初始化length长度的结果数组
 * 2、初始化游标数组，长度为list.length，每一项初始化为0，用于记录每一结果项的list来源项的下标
 * 3、开始循环结果数组（循环1），根据游标数组，获取要填入结果数组的list下标，从而获取list项，然后填入结果数组
 * 4、更新游标数组，更新为循环1下一次循环所要填入的下标
 * 5、直到循环1循环结束，算法结束
 */
export function combination(list){
  let pointList = []; // 游标列表
  let maxLengthList = []; // 二维列表每一项的长度数组列表
  let length = 1;
  // 构建游标列表和二维列表每一项的长度数组列表
  for(let groupIndex = 0; groupIndex < list.length ; groupIndex ++){
    let group = list[groupIndex];
    maxLengthList.push(group.length);
    length = length * group.length;
    pointList.push(0);
  }
  // console.log(`${length}种组合`);
  /**
   * 游标列表更新函数
   */
  function updatePointList() {
    for(let i = pointList.length - 1; i > -1; i--){
      if(pointList[i] < maxLengthList[i] - 1){
        pointList[i] ++;
        break;
      }

      pointList[i] = 0;
    }
  }
  let result = [];// 结果队列
  for(let resultIndex = 0 ; resultIndex < length ; resultIndex ++){
    result[resultIndex] = [];
    // 根据游标队列定位到各项item的位置
    for(let pointIndex = 0 ; pointIndex < pointList.length ; pointIndex ++){
      let point = pointList[pointIndex];
      result[resultIndex].push(list[pointIndex][point]);
    }
    updatePointList();

  }
  return result;
}
