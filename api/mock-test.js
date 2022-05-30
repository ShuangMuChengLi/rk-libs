// 使用 Mock
var Mock = require('mockjs');
var data = Mock.mock('/url', {
  'successFlag':true,
  'message':'调用成功',
  'code':200,
  'data':[{
    'alarmType': '没戴头盔',
    'alarmCount': '80'
  }, {
    'alarmType': '禁行',
    'alarmCount': '50'
  }
  ]
});
