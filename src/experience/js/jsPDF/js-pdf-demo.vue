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
      const doc = new jsPDF();
      doc.addFont(simkai, 'MyFont', 'normal');
      doc.setFont('MyFont');
      doc.text('爱我中华!', 10, 10);
      doc.save('a4.pdf'); // will save the file in the current working directory
      return;

      fetch(simkai, {
        responseType: 'blob'
      })
        .then(response => {
          return response.blob();
        })
        .then(blob => {
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
          oFileReader.readAsDataURL(blob);
        });

    }
  },
};
</script>

<style scoped>

</style>
