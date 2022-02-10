let result = ['张三', '李四', '王五'].sort(function(a, b){
  return a.localeCompare(b, 'cn');
});
console.log(result);
