<template>
  <div class="wrapper">
    <purdah-slide
      :data="data"
    />
  </div>
</template>

<script>
import PurdahSlide from '@/components/purdah-slide/purdah-slide';
export default {
  name: 'VueTest',
  components: { PurdahSlide },
  data(){
    return {
      data: [
        'https://hbfile.huabanimg.com/img/home/banner/1a6ad3b820b1246aa6340a1a64546c58a735fc8520679e',
        'https://hbimg.huabanimg.com/04c47a48ab9150858b14516bdd4ff5fcd1dac07de47b7-fFWD0B',
        'https://hbimg.huabanimg.com/4180317ceda10ebbc185b799c1a4b5cc610468719d7bf-KvqDTe',
      ]
    };
  },
};
</script>

<style scoped>
  .wrapper{
    width: 500px;
    height: 500px;
  }
</style>
