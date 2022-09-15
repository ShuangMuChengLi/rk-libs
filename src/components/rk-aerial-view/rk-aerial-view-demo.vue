<template>
  <div class="rk-aerial-view-demo">
    <rk-aerial-view>
      <div class="rk-aerial-view-in">
        <div>鸟瞰图 slot demo</div>
        <img :src="deomImg" />
      </div>
    </rk-aerial-view>
  </div>
</template>

<script>
import rkAerialView from './rk-aerial-view';
import deomImg from './zoro.jpg';
export default {
  name: 'RkAerialViewDemo',
  components: {
    rkAerialView
  },
  data() {
    return {
      deomImg
    };
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
  .rk-aerial-view-demo {
    width: 500px;
    height: 400px;
  }
  .rk-aerial-view-in {
    & > img{
      width: 700px;
      height: 400px;
    }
  }
</style>
