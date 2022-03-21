<template>
  <div class="home">
    <div class="headerWrapper">
      <div class="container">
        <h1>前端组件函数库</h1>
      </div>
    </div>
    <div class="left">
      <side-nav
        @change="navChange"
      />
    </div>
    <div
      id="main"
      class="right"
    >
      <vue-markdown :source="h" />
    </div>
  </div>
</template>

<script>

import VueMarkdown from 'vue-markdown';
import SideNav from '@/views/side-nav/side-nav';
export default {
  name: 'Home',
  components: {
    VueMarkdown,
    SideNav
  },
  data(){
    return {
      h: ''
    };
  },
  watch:{
    '$route':function(){
      document.documentElement.scrollTop = 0;
    }
  },
  mounted () {
    document.getElementById('main').addEventListener('click', (e)=>{
      if(e.target.nodeName === 'A'){
        window.open(e.target.href);
        e.preventDefault();
      }
    });
  },
  methods:{
    navChange(source){
      this.h = source;
    }
  }
};
</script>
<style scoped lang="less">
@import "home";
.home{
  /deep/table{
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 45px;
    line-height: 1.5em;
    td{
      border-bottom: 1px solid #dcdfe6;
      padding: 15px;
      max-width: 250px;
      color: #606266;
    }

    th {
      text-align: left;
      white-space: nowrap;
      color: #909399;
      font-weight: 400;
      border-bottom: 1px solid #dcdfe6;
      padding: 15px;
      max-width: 250px;
    }
  }
}
</style>
