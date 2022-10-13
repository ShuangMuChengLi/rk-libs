// 为了适应web worker 只转换成buf，可通过 new Blob 转换成
import XLSX from 'xlsx';

export function exportBuf(aoa, merges) {
  const tableData = aoa || [
    ['姓名', '性别', '年龄', '注册时间'],
    ['张三', '男', 18, new Date()],
    ['李四', '男', 18, new Date()]
  ];
  const sheet = XLSX.utils.aoa_to_sheet(tableData); // 工具类会生成对应 Sheets的格式
  //设置样式

  //先遍历表头数据，判断表头数据的长度
  let colWidth = [];
  for (let item of tableData[0]) { //只对头部宽度进行处理
    if (item === null || item === ''){
      colWidth.push({
        wch: 10
      });
      continue;
    }

    if (item.toString().charCodeAt(0) > 255){
      colWidth.push({
        wch: item.toString().length * 2 + 5
      });
      continue;
    }
    colWidth.push({
      wch: item.toString().length + 5
    });
  }

  sheet['!cols'] = colWidth;
  // 小区定制版 --- 在传递一个参数 [[1, 1], [1, 1]]  --- 这种格式 里面分别代表r 和 l；
  // 小区导出的逻辑 可以先获取那个派出所字段的长度 然后依次累加
  sheet['!merges'] = merges || [
    // 设置A1-C1的单元格合并 --- 都是从0开始
    //s 开始， e 结束
    //r === row 行； c === col 列
    //合并 1 2行 第1列（从0开始）
    // {s: {r: 1, c: 1}, e: {r: 2, c: 1}},
    // {s: {r: 1, c: 1}, e: {r: 2, c: 1}}
  ];
  sheet['A1'].s = {
    font: {
      name: '宋体',
      sz: 18,
      color: {rgb: 'ff0000'},
      bold: true,
      italic: false,
      underline: false
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center'
    },
    fill: {
      fgColor: {rgb: '008000'},
    },
  };

  function sheet2blob(sheet, sheetName = 'mySheet') {
    const workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    const workOptions = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    };

    const defaultCellStyle = {
      font: { name: '宋体', sz: 11, color: { auto: 1 } },
      border: {
        color: { auto: 1 }
      },
      alignment: {
        /// 自动换行
        wrapText: 1,
        // 居中
        horizontal: 'center',
        vertical: 'center',
        indent: 0
      }
    };

    const wbOut = XLSX.write(workbook, workOptions, {defaultCellStyle: defaultCellStyle});
    //
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;

      return buf;
    }

    // const blob = new Blob([s2ab(wbOut)], {type: 'application/octet-stream'});
    // const url = URL.createObjectURL(blob); //转换成字符串 详情见 MDN
    // var aLink = document.createElement('a');
    // aLink.href = url;
    // aLink.download = '导出.xlsx' || ''; // HTML5新增的属
    // aLink.click();

    return s2ab(wbOut);
  }
  return sheet2blob(sheet);
}
export function exportExcel(list, merges, fileName) {
  const buf = exportBuf(list, merges);
  const blob = new Blob([buf], {type: 'application/octet-stream'});
  const url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}
