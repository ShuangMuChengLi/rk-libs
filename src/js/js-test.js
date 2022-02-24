let p = function (){
  return new Promise((resolve, reject)=>{
    reject('reject');
  });
};
p().catch((data)=>{
  console.log(1, data);
  return 2;
}).catch((data)=>{
  console.log(2, data);
});
