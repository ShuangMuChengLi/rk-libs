# 字体资源下载

## preview
[预览](./index.html#/demo/font)

## download
[解决方案下载](./experience/html/font.zip)

## usage
```vue
<template>
  <div class="font">21 : 14 : 15</div>
</template>

<script>
export default {
  name: 'Font',
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
@font-face {
    font-family: LED-font;
    font-weight: normal;
    font-style: normal;
    src: url('./UnidreamLED.12fc1608.ttf') ;
}
.font{
  font-size: 30px;
  font-family: LED-font;
  color: cornflowerblue;
}
</style>
```

