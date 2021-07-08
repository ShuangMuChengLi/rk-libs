<template>
  <div class="wrapper">
    <el-button
      type="primary"
      @click="stop"
    >
      {{ isStop? '继续': '暂停' }}
    </el-button>
    <el-button
      type="primary"
      @click="add"
    >
      添加幻灯并重载
    </el-button>
    <div
      id="target"
      class="ctx"
    >
    </div>
    <div
      v-show="false"
      id="source"
      class="ctx"
    >
      <div
        v-for="item in count"
        :key="item"
        class="item"
      >
        <div class="item-inner">
          <img src="./1.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ThreeSlide } from '@/js/html/three-slide/three-slide';
export default {
  name: 'ThreeSlideDemo',
  data(){
    return {
      isStop: false,
      first: null,
      second: null,
      count: 5
    };
  },
  mounted () {
    this.first = new ThreeSlide({
      source: 'source',
      target: 'target'
    });
  },
  methods:{
    stop(){
      this.isStop = !this.isStop;
      this.first.toggle();
    },
    add(){
      this.count ++;
      this.$nextTick(()=>{
        this.first.reload();
      });
    }
  }
};
</script>

<style scoped lang="less">
.wrapper{
  width: 500px;
  height: 400px;
  .ctx{
    width: 100%;
    height: 100%;
    .item{
      width: 500px;
      height: 500px;
      .item-inner{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 400px;
        }
      }
    }
  }
}
</style>
