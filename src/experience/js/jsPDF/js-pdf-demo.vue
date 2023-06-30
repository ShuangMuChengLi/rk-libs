<template>
  <div>
    <el-button
      type="primary"
      @click="test"
    >
      下载
    </el-button>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf';
import simkai from './simkai.ttf';
import axios from 'axios';
console.log(simkai);
const fs = require('fs'); // will automatically load the node version
const path = require('path');
export default {
  name: 'JsPdfDemo',
  mounted() {
  },
  methods:{
    getBase64(imgUrl) {

    },
    test(){
      axios.get(simkai, {
        responseType: 'blob'
      })
        .then(res => {
          let oFileReader = new FileReader();
          oFileReader.onloadend = function(e) {
            // base64结果
            const base64 = e.target.result.slice('data:font/ttf;base64,'.length);
            const doc = new jsPDF();
            // add the font to jsPDF
            doc.addFileToVFS('MyFont.ttf', base64);
            doc.addFont('MyFont.ttf', 'MyFont', 'normal');
            doc.setFont('MyFont');
            doc.text('爱我中华!', 10, 10);
            doc.save('a4.pdf'); // will save the file in the current working directory
          };
          oFileReader.readAsDataURL(res.data);
        });

    }
  },
};
</script>

<style scoped>

</style>
