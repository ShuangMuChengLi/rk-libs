/**
 * Created by lin on 2017/7/28.
 */
export const systemUtil = {
  /**
   *  校验elementUI表单
   * @param formRef
   * @returns {Promise<unknown>}
   */
  validateForm(formRef){
    return new Promise((resolve, reject)=>{
      formRef.validate((valid)=>{
        if(valid){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  },
  /**
   * 三分法逗号分割数字
   * @param num
   * @returns {string}
   */
  toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  },
  /**
   * blob转为base64
   * @param blob  Blob或者FIle
   * @returns {Promise<unknown>}
   */
  async blobToBase64(blob){
    return await new Promise(resolve=>{
      let oFileReader = new FileReader();
      oFileReader.onloadend = function(e) {
        resolve(e.target.result);
      };
      oFileReader.readAsDataURL(blob);
    });
  },
  /**
   * File转为base64
   * @param file File
   * @returns {Promise<minimist.Opts.unknown>}
   */
  async fileToBase64(file){
    return await this.blobToBase64(file);
  },
  /**
   * base64转为blob
   * @param data
   * @param mime
   * @returns {Blob}
   * @constructor
   */
  base64ToBlob(data, mime) {
    data = data.split(',')[1];
    data = window.atob(data);
    let ia = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i);
    }
    // canvas.toDataURL 返回的默认格式就是 image/png
    return new Blob([ia], {
      type: mime
    });
  },
  /**
   * blob转为File
   * @param bits  一个包含ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的 Array — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容。
   * @param name   表示文件名称，或者文件路径。
   * @param options   DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 "" 。
   * @returns {*}
   */
  blobToFile(bits, name, options){
    return new File(bits, name, options);
  },
  /**
   * 导出文件
   * @param {arraybuffer} data
   */
  exportFile(data) {
    // 1、获取文件名
    const reg = /(?<=filename=)[^&]*/;
    const matchs = data.headers['content-disposition'].match(reg);
    let filename = '';
    if(matchs) {
      filename = decodeURIComponent(matchs[0]);
    }
    // 创建blob文件流
    let blob = new Blob([data.data]);

    let a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(blob);;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    a = null;
  },
  clipboard(text){
    if(navigator.clipboard){
      navigator.clipboard.writeText(text);
    }else{
      const input = document.createElement('input');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  }
};
