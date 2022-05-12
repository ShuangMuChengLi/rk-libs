// /(\d)(?=(?:\d{3})+$)/g
// let n = 1234567890;
// function toThousands(num) {
//   return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
// }
// let o = toThousands(n);
// console.log(o);
//
// let n = 1234567890;
// let reg = /(\d)(?=(?:\d{3})+$)/g;
// let result = n.toString().match(reg);
// console.log(result);
//
// // let reg2 = /(\d)(?:\d{3})+$/g;
// // let result2 = n.toString().match(reg2);
// // console.log(result2);
// let s = '<div class="tag">相似度</div>';
// let reg = /(?:<div class="tag">)((?!<\/div>).*)(?:<\/div>)/;
// let result = s.replace(reg, '##$1##');
// console.log(result);
// let s = '<div class="tag-item">身份证</div><div class="tag-item">相似度</div>';
// let reg = /(?:<div class="tag-item">)((?!<\/div>).*?)(?:<\/div>)/g;
// // let result = s.match(reg);
// let result = s.replace(reg, '##$1##');
// console.log(result);
let s = '[身份证]我[相似度]';
let reg = /(?<=\[)((?!]).*?)(?=])/g;
let result = s.match(reg);
// let result = s.replace(reg, '##$1##');
console.log(result);
