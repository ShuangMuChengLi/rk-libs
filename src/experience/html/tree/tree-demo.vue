<template>
  <div>
    <ul
      id="treeDemo"
      class="ztree"
    />
    <el-button
      type="primary"
      @click="getCheckedNodes"
    >
      测试
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'TreeDemo',
  mounted() {
    var setting = {
      check: {
        enable: true
      },
      // data: {
      //   simpleData: {
      //     enable: true
      //   }
      // },
      view:{
        showIcon: false
      }
    };

    var zNodes = [
      {
        name: 'test1',
        open: true,
        children: [
          {name: 'test1_1'}, {name: 'test1_2'}
        ]
      },
      {
        name: 'test2',
        open: true,
        children: [
          {name: 'test2_1'},
          {name: 'test2_2'}
        ]
      }
    ];

    $.fn.zTree.init($('#treeDemo'), setting, zNodes);
  },
  methods:{
    getCheckedNodes(){
      var zTree = $.fn.zTree.getZTreeObj('treeDemo');
      console.log(zTree.getCheckedNodes());
    }
  }
};
</script>

<style scoped lang="less">
//ul.ztree {
//  margin-top: 10px;
//  border: 1px solid #617775;
//  background: #f0f6e4;
//  width: 220px;
//  height: 360px;
//  overflow-y: scroll;
//  overflow-x: auto;
//}
</style>
