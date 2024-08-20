/**
 * 下载文件
 * @param {string} url 文件地址
 * @param {string} fileName 文件名，含后缀
 */
const download = (url, fileName) => {
  try {
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * 导出word
 * @param {string} text 选择器或者DOM元素
 * @param {string} fileName 文件名，不含后缀
 * @param {string} style 样式
 */
export const exportWord = (text, fileName = 'word', style = '') => {
  text = text.replace(/\r\n/g, '<br/>');
  const exportHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta charset='utf-8'>
                <title>${fileName}</title>
                ${style ? `<style>${style} </style>` : ''}
            </head>
            <body >
                <div style="white-space: pre-wrap;">${text}</div>
            </body>
        </html>
    `;

  const url =
        'data:application/vnd.ms-word;charset=utf-8,' +
        encodeURIComponent(exportHtml);

  download(url, fileName + '.doc');

  return Promise.resolve(true);
};