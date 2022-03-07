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
let D =
{
  '变量1': '数据值',
  '变量2': '数据值',
};
