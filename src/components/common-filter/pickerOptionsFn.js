import moment from 'moment';
export const pickerOptionsFn = function (vue, form, key) {
  let now = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
  return {
    shortcuts: [
      {
        'text': '今天',
        onClick(picker){
          let start = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
          picker.$emit('pick', start);
          vue.$set(form, key, now);
        }
      },
      {
        'text': '昨天',
        onClick(picker){
          let start = moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
          let end = moment().subtract(1, 'days').endOf('days').format('YYYY-MM-DD HH:mm:ss'); //上周周一
          picker.$emit('pick', start);
          vue.$set(form, key, end);
        }
      },
      {
        'text': '本周',
        onClick(picker){
          let weekDay = moment().format('d') - 1;
          let start = moment().subtract(weekDay, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'); //本周周一
          picker.$emit('pick', start);
          vue.$set(form, key, now);
        }
      },
      {
        'text': '上周',
        onClick(picker){
          let start = moment().subtract(1, 'week').startOf('day').format('YYYY-MM-DD HH:mm:ss'); //上周周一
          let end = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD HH:mm:ss'); //上周周一
          picker.$emit('pick', start);
          vue.$set(form, key, end);
        }
      },
      {
        'text': '本月',
        onClick(picker){
          let start = moment().month(moment().month()).startOf('month').format('YYYY-MM-DD HH:mm:ss');
          picker.$emit('pick', start);
          vue.$set(form, key, now);
        }
      },
      {
        'text': '上月',
        onClick(picker){
          let start = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss');
          let end = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss');
          picker.$emit('pick', start);
          vue.$set(form, key, end);
        }
      },
      {
        'text': '今年',
        onClick(picker){
          let start = moment().year(moment().year()).startOf('year').format('YYYY-MM-DD HH:mm:ss');
          picker.$emit('pick', start);
          vue.$set(form, key, now);
        }
      },
      {
        'text': '全部',
        onClick(picker){
          picker.$emit('pick', null);
          vue.$set(form, key, now);
        }
      }
    ]
  };
};
