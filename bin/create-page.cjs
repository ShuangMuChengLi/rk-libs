let path = require('path');
const _ = require('lodash');
let arg = process.argv;
const pageName = arg[2];
const pathUrl = process.cwd();
let fs = require('fs');
const className = _.kebabCase(pageName);
fs.mkdirSync(path.resolve(pathUrl, pageName));
let vueTemp =
  `<template>
<div class="${className}">
  ${pageName}
</div>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {

})
</script>
<style scoped lang="scss">
@import "./${pageName}";
</style>
`
const cssTemp = `
.${className}{

}
`
fs.writeFileSync(path.resolve(pathUrl, pageName, pageName + '.vue'), vueTemp);
fs.writeFileSync(path.resolve(pathUrl, pageName, pageName + '.scss'), cssTemp);
fs.mkdirSync(path.resolve(pathUrl, pageName, 'images'));
