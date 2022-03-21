<template>
  <div class="demo-wrapper">
    <common-table
      :column="faceColumn"
      :data="faceList"
      :page-info="pageInfo"
    >
      <template v-slot:img="scope">
        <el-image :src="scope.row.img" />
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
      faceColumn:[
        {
          prop: '',
          label: '抓拍照',
          width: null,
          slot: 'img'
        },
        {
          prop: 'name',
          label: '名字',
          width: null
        },
        {
          prop: ['datetime', 'address'],
          label: '时间/地点',
          width: null
        },
      ],
      faceList:[
        {
          img: 'https://picsum.photos/200/300',
          name: '张三',
          datetime: '2022-03-21 12:12:12',
          address: '软件园',
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
  .demo-wrapper{
    width: 800px;
    height: 600px;
  }
</style>
