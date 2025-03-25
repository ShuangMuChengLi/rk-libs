let path = require('path');
let arg = process.argv;
const pageName = arg[2];
const pathUrl = process.cwd();
let fs = require('fs');
const _ = require('lodash');
fs.mkdirSync(path.resolve(pathUrl, pageName));
let className = _.kebabCase(pageName);
let vueTemp =
`<template>
  <div class="${className}">
    ${pageName}
  </div>
</template>

<script>
export default{
  name: '${pageName}',
  data() {
    return{};
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
@import "./${pageName}.scss";
</style>

`;
let scssTemp =
`.${className}{

}
`;

fs.writeFileSync(path.resolve(pathUrl, pageName, pageName + '.vue'), vueTemp);
fs.writeFileSync(path.resolve(pathUrl, pageName, pageName + '.scss'), scssTemp);
fs.mkdirSync(path.resolve(pathUrl, pageName, 'images'));
