let CodeGeneratorConfig = [
  {
    key: '变量名', // 变量名
    sourceType: '数据源类型', // 数据源类型
    // 数据源连接参数
    DBArg: {
      DBType: '', // 数据库类型
      host: '', // 数据库地址
      table: '', // 数据库表名
      port: '', // 数据库端口
      username: '', // 数据库用户名
      password: '', // 数据库密码
      valuePath: '' // 数据取值路径
    },
    // 本地文件请求参数
    fileArg:{
      filePath: '', // 本地文件地址
      valuePath: '' // 数据取值路径
    },
    // 远程接口请求参数
    apiArg:{
      apiPath: '', // 远程接口地址
      method: '', // 远程接口请求方法 POST GET
      valuePath: 'firstKey.secondKey.lastKey' // 数据取值路径
    },
    value: null, // 数据节点
  }
];
function getData(config){
  return new Promise((resolve, reject) => {
    let data = {};
    let count = 0;
    function successCallback(){
      if(count === config.length){
        resolve();
      }
    }
    for(let item of config){
      data[item].key = {};
      if(item.sourceType === 'db'){
        (async ()=>{
          data[item].key = selectByDB(item.DBArg).catch((e)=>{
            reject(e);
          });
          count++;
        })();
      }
      if(item.sourceType === 'api'){
        (async ()=>{
          data[item].key = selectByRemoteApi(item.apiArg).catch((e)=>{
            reject(e);
          });
          count++;
        })();
      }
      if(item.sourceType === 'value'){
        data[item].key = item.value;
        count++;
      }
    }
  });
}
let D =
{
  '变量1': '数据值',
  '变量2': '数据值',
};
let TList = [
  {
    id: '', // 模板id
    name: '', // 模板名
    TPath: '', // EJS模板文件存储路径
    SCPath: '', // 数据配置文件文件存储路径
  }
];
let ModelOwnerTable = [
  {
    userId: '', // 用户id
    MId: '' // 模式Id
  }
];
let ModelSharedTable = [
  {
    userId: '', // 被分享者用户id
    MId: '' // 模式Id
  }
];
