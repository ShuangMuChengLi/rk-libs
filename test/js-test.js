function main(){
  this.timeSet = [
    {
      id: '',
      fn(){

      },
      time,
      d
    }
  ];
  setInterval(()=>{
    for(let time of this.timeSet){

    }
  }, 1000);

}
main.prototype.setTimer = function (arg){
  this.timeSet.push(arg);
}
main.prototype.delTimer = function (id){
  let item = _.find(this.timeSet, )
  this.timeSet.push(arg);
}
