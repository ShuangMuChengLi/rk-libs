// /(\d)(?=(?:\d{3})+$)/g
// let n = 1234567890;
// function toThousands(num) {
//   return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
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
// let s = "<div class="tag">相似度</div>";
// let reg = /(?:<div class="tag">)((?!<\/div>).*)(?:<\/div>)/;
// let result = s.replace(reg, "##$1##");
// console.log(result);
// let s = "<div class="tag-item">身份证</div><div class="tag-item">相似度</div>";
// let reg = /(?:<div class="tag-item">)((?!<\/div>).*?)(?:<\/div>)/g;
// // let result = s.match(reg);
// let result = s.replace(reg, "##$1##");
// console.log(result);
// let s = "[身份证]我[相似度]";
// let reg = /(?<=\[)((?!]).*?)(?=])/g;
// let result = s.match(reg);
// // let result = s.replace(reg, "##$1##");
// console.log(result);
// let _ = require("lodash");
// let list = [
//   {
//     name: 1,
//     value: 2
//   },
//   {
//     name: 1,
//     value: 3
//   }
// ];
// console.log(_.filter(list, {name: 1}));

// console.log((700 * 0.15 + 243) / 3300)
let j = `[
  ["日期", "姓名", "地址"],
  ["2016-05-02", "王小虎", "上海市普陀区金沙江路 1518 弄"],
  ["2016-05-03", "王小虎", "上海市普陀区金沙江路 1518 弄"],
  ["2016-05-04", "王小虎", "上海市普陀区金沙江路 1518 弄"]
]`;
console.log(j.match(/\s/g));
console.log(JSON.parse(j.replace(/\s/g, '')));
