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
  <el-dialog
    v-model="dialogVisible"
    title=""
    width="500"
    class="${className}"
    :close-on-click-modal="false"
  >
  ${pageName}
  </el-dialog>
</template>
<script setup>
import { onMounted } from 'vue';
import useDialog from '@/utils/useDialog';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits(['update:modelValue']);
let { dialogVisible } = useDialog(emits, props);
onMounted(() => {});
</script>
<style scoped lang="scss">
@import './${pageName}';
</style>

`
const cssTemp = `
.${className}{

}
`
fs.writeFileSync(path.resolve(pathUrl, pageName, pageName + '.vue'), vueTemp);
fs.writeFileSync(path.resolve(pathUrl, pageName, pageName + '.scss'), cssTemp);
fs.mkdirSync(path.resolve(pathUrl, pageName, 'images'));
