const axios = require('axios');
const path = require('path');
const fs = require('fs');
axios.get('https://hbfile.huabanimg.com/img/home/banner/61cfdd6b42d079d8370656fe32632d27f2a2389798fbd', {responseType: 'arraybuffer'}).then((res)=>{
  fs.writeFile(path.resolve(__dirname, '1.jpg'), res.data, 'binary', (err => {
    console.log(err);
  }));
}).catch((e)=>{
  console.error(e);
});
