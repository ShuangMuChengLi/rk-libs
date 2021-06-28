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
    <div id="main" class="right">
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
</style>
