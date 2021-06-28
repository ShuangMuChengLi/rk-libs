/**
 * 计算年龄
 * @param birthday   1999-10-08
 * @returns {Number}
 */
export function getAge(birthday) {
  let birthdayTimestamp = new Date(birthday).getTime();
  let nowTimestamp = new Date().getTime();
  let tempTime = nowTimestamp - birthdayTimestamp;
  return parseInt(tempTime / 1000 / 60 / 60 / 24 / 365);
}
