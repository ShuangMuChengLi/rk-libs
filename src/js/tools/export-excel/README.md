# 前端生成并导出excel
前端生成并导出excel
## preview
[预览](./index.html#/tools/export-excel)
## Download
[库文件下载](./js/tools/export-excel.zip)
## dependence
"xlsx": "^0.17.5"
## methods
### exportExcel(list, merges, fileName)
#### Arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| list | 包含表头的表格数据的二维数组 | Array | - | -  | 
| merges | 字段合并配置（r是行  c是列  s是开始  e是结束）格式参考demo | Array | - | -  | 
| fileName | 文件名 | String | - | -  | 
## demo
```
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
```

