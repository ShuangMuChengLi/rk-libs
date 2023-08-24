<template>
  <div class="wrapper">
    <el-button type="primary" @click="getFile">下载</el-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'VideoExample',
  async mounted() {

  },
  methods:{
    getFile(){
      axios({
        url: '/local/html/file',
        method: 'get',
        // responseType: 'arraybuffer',
        responseType: 'blob',
      }).then(res=>{
        this.exportFile(res);
      });
    },
    /**
     * 导出文件
     * @param {arraybuffer} data
     */
    exportFile(data) {
      // 创建blob文件流
      // let blob = new Blob([data.data]);

      let a = document.createElement('a');
      a.download = '1.jpg';
      a.href = URL.createObjectURL(data.data);;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      a = null;
    }
  }
};
</script>
<style scoped lang="less">
.out{
  border: 1px dashed #333;
  width: 100px;
  height: 100px;
  position: relative;
  .card{
    position: absolute;
    transform: matrix(1, 0, 0, 1, 100, 0);
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ff8c66;
  }
}

</style>
