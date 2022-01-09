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
        'https://picsum.photos/id/100/500/300',
        'https://picsum.photos/id/1003/500/300',
        'https://picsum.photos/id/1037/500/300',
      ]
    };
  },
};
</script>

<style scoped>
  .wrapper{
    width: 500px;
    height: 300px;
  }
</style>
