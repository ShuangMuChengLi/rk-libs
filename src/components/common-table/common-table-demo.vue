<template>
  <div class="demo-wrapper">
    <common-table
      :column="columnConfig"
      :data="list"
      :total="total"
      :page-info.sync="pageInfo"
      :has-selection="true"
      @imgClick="imgClick"
      @rowClick="rowClick"
      @pageChange="pageChange"
      @selectionChange="selectionChange"
    >
      <template v-slot:handler="scope">
        <el-button
          type="primary"
          size="mini"
          @click="view(scope.row)"
        >
          查看
        </el-button>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonTable from './common-table';
export default {
  name: 'CommonTableDemo',
  components: {CommonTable},
  data(){
    return {
      pageInfo: {
        pageId: 1,
        pageSize: 10,
      },
      total: 100,
      columnConfig:[
        {
          prop: 'img',
          label: '抓拍照',
          width: null,
          type: 'img'
        },
        {
          prop: 'name',
          label: '名字',
          width: null
        },
        {
          label: '状态',
          width: null,
          fn(row){
            if(row.state === 1){
              return '在线';
            }else{
              return '离线';
            }
          }
        },
        {
          prop: ['datetime', 'address'],
          label: '时间/地点',
          width: null
        },
        {
          prop: 'handler',
          label: '操作',
          width: null,
          slot: 'handler'
        },
      ],
      list:[
        {
          img: './photo.png',
          name: '张三',
          datetime: '2022-03-21 12:12:12',
          address: '软件园',
          state: 1
        }
      ]
    };
  },
  methods:{
    selectionChange(val){
      console.log(val);
    },
    rowClick(row){
      console.log(row);
    },
    imgClick(row, index, prop){
      console.log(row, index, prop);
    },
    pageChange(){
      console.log('pageChange');
    },
    view(row){
      console.log(row);
    }
  }
};
</script>

<style scoped lang="less">
  .demo-wrapper{
    width: 800px;
    height: 600px;
  }
</style>
