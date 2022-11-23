<template>
  <common-filter
    :form-info="filterConfig"
    @submit="query"
  >
    <el-button
      type="primary"
    >
      新增
    </el-button>
  </common-filter>
</template>
<script>
import CommonFilter from './common-filter';
export default {
  name: 'CommonFilterDemo',
  components: {CommonFilter},
  data(){
    return {
      filterConfig: [
        {
          label: '漫入日期',
          prop: ['mrqssj', 'mrjssj'],
          type: 'dateRange'
        },
        {
          label: '人员状态',
          prop: 'ryzt',
          type: 'select',
          options: [
            {
              label: '14天以内',
              value: '1014'
            },
            {
              label: '14天以上',
              value: '2014'
            }
          ]
        },
        {
          label: '中高风险地',
          prop: 'fxdj',
          type: 'select',
          options: [
            {
              label: '高风险',
              value: '1'
            },
            {
              label: '中风险',
              value: '2'
            },
            {
              label: '低风险',
              value: '3'
            },
          ]
        },
        {
          label: '浸入地',
          prop: 'mrd',
          type: 'input',
        },
        {
          label: '关键字',
          prop: 'keyword',
          type: 'input',
        }
      ],
      form: {}
    };
  },
  methods:{
    query(form){
      this.form = form;
      this.getList();
    },
    getList(){

    }
  }
};
</script>

<style scoped>

</style>
