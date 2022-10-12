<template>
  <div class="wrapper">
    <el-input
      v-model="textarea"
      class="textarea"
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
    />
    <div class="bottom">
      <el-button
        type="primary"
        @click="exportExcel"
      >
        导出
      </el-button>
    </div>
  </div>
</template>

<script>
import xlsx from 'node-xlsx';
import FileSaver from 'file-saver';
export default {
  name: 'ExcelDemo',
  data(){
    return {
      textarea: `[
        [1, 2, 3],
        [true, false, null, 'sheetjs'],
        ['foo', 'bar', 'new Date('2014-02-19T14:30Z')', '0.3'],
        ['baz', null, 'qux'],
      ]`
    };
  },
  methods:{
    exportExcel(){
      let data = [
        [1, 2, 3],
        [true, false, null, 'sheetjs'],
        ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
        ['baz', null, 'qux'],
      ];
      // let data = JSON.parse(this.textarea);
      console.log(data);
      var buffer = xlsx.build([{name: 'mySheetName.xlsx', data:data }]);
      FileSaver.saveAs(
        // Blob 对象表示一个不可变、原始数据的类文件对象。
        // Blob 表示的不一定是JavaScript原生格式的数据。
        // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
        // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
        new Blob([buffer], { type: 'application/octet-stream' }),
        // 设置导出文件名称 xxx.xlsx
        '中心申请费用类型统计.xlsx'
      );
    }
  }
};
</script>

<style scoped>
.wrapper{
  margin: 20px;
}
.textarea{
  width: 600px;
  margin-bottom: 20px;
}
.bottom{
  width: 600px;
  display: flex;
  justify-content: right;
}
</style>
