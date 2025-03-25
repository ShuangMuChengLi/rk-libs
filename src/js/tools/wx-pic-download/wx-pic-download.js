function toast(msg) {
  uni.showToast({
    title: msg,
    duration: 2000,
    icon: 'none'
  });
}
export const wxPicDownload = {
  toast,
  async processImage(url) {
    let canvas, ctx;
    
    canvas = wx.createOffscreenCanvas({ type: '2d', width: 300, height: 200 });

    // 2. 下载图片
    const downloadRes = await this.downloadFile(url).then(res=>res).catch(err=>false);
    if(!downloadRes)return false;
    
    // 3. 绘制到离屏画布
    await this.drawImage(canvas, downloadRes.tempFilePath);
    
    // 4. 导出图片文件
    const tempFile = await this.canvasToTempFile(canvas).then(res=>res).catch(err=>false);
    if(!tempFile)return false;
    
    // 5. 保存到相册
    return await this.saveToAlbum(tempFile).then(res=>true).catch(err=>false);
  },

  // 封装下载方法
  downloadFile(url) {
    return new Promise((resolve, reject) => {
      uni.downloadFile({
        url,
        success: resolve,
        fail: reject
      });
    });
  },

  // 封装绘制方法
  async drawImage(canvas, imagePath) {
    // 创建一个图片
    const image = canvas.createImage();
    // 等待图片加载
    await new Promise(resolve => {
      image.onload = resolve;
      image.src = imagePath; // 要加载的图片 url
    });

    canvas.width = image.width;
    canvas.height = image.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
  },

  // 封装Canvas转临时文件
  canvasToTempFile(canvas) {
    return new Promise((resolve, reject) => {
      // #ifdef MP-WEIXIN
      wx.canvasToTempFilePath({
        canvas,
        fileType: 'png',
        success: resolve,
        fail: reject
      });
      // #endif
      
      // #ifdef H5
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve({ tempFilePath: url });
      }, 'image/png');
      // #endif
    });
  },

  // 封装保存到相册
  saveToAlbum(file) {
    return new Promise((resolve, reject) => {
      // #ifdef MP-WEIXIN
      wx.saveImageToPhotosAlbum({
        filePath: file.tempFilePath,
        success: resolve,
        fail: reject
      });
      // #endif
      
      // #ifdef H5
      const link = document.createElement('a');
      link.href = file.tempFilePath;
      link.download = 'image.png';
      link.click();
      resolve(true);
      // #endif
    });
  },
  async downloadImageList(list) {
    
    let errorList = [];
    for(let i = 0; i < list.length; i++) {
      let result = await wxPicDownload.processImage(list[i]);
      if(!result) {
        errorList.push(i + 1);
        continue;
      }
    }
    if(errorList.length) {
      wxPicDownload.toast(`共${list.length}张，第${errorList.join()}保存失败`);
      return false;
    }

      
    wxPicDownload.toast(`共${list.length}张,全部保存成功`);
    return true;
  },
}