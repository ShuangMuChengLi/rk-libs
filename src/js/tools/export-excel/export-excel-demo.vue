<template>
  <el-button
    type="primary"
    @click="download"
  >
    导出
  </el-button>
</template>

<script>
import {exportExcel} from './export-excel';

export default {
  name: 'ExportExcelDemo',
  methods:{
    download(){
      let list = [
        ['月度抓拍统计', '', ''],
        ['日期', '姓名', '地址'],
        ['2016-05-02', '王小虎', '上海市普陀区金沙江路 1518 弄'],
        ['2016-05-03', '王小虎', '上海市普陀区金沙江路 1518 弄'],
        ['2016-05-04', '王小虎', '上海市普陀区金沙江路 1518 弄']
      ];
      // r是行  c是列  s是开始  e是结束
      let merges = [(
        {
          s: { r: 0, c: 0 },
          e: { r: 0, c: 2 }
        }
      )];
      exportExcel(list, merges, '月度抓拍统计.xlsx');
    }
  }
};
</script>

<style scoped lang="less">

</style>
