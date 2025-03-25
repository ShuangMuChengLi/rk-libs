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
  <el-dialog
    class="${className} dialog-theme"
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <div class="dialog-body">
      ${pageName}
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogVisible = false"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { innerDialogMixin } from '@/utils/inner-dialog-mixin';


export default{
  name: '${pageName}',
  mixins:[innerDialogMixin],
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
