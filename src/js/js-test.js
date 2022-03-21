let o = {
  name: 'o',
  fn(...arg){
    console.log(this.name, arg);
  }
};
let q = {
  name: 'q',
  fn(...arg){
    console.log(this.name, arg);
  }
};
q.fn.apply(o, [1, 2]);
q.fn.call(o, 1, 2);
