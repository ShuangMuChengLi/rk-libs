<template>
  <div class="wrap">
    <a
      class="model"
      href="javascript:void(0)"
      @click="loadModel()"
    >设置内容</a>
    <div
      id="editor"
      type="text/plain"
      style="height:500px;"
    />
  </div>
</template>

<script>
var UE = require('../../../../public/ueditor/ueditor.all');

export default {
  mounted:function () {
    this.ue = UE.getEditor('editor', {'autoHeightEnabled': false});
  },
  methods: {
    loadModel (){
      this.ue.setContent('内容');
    }
  },
  destroyUe(){
    UE.delEditor('editor');
  },
};
</script>
