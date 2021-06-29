<template>
  <div class="progress-bar-wrapper">
    <div
      class="prev-btn"
      @click="prev"
    />
    <div class="rule">
      <rule
        id="progressBarRule"
        ref="rule"
        :current="current"
        @change="ruleChange"
      />
    </div>
    <div
      class="next-btn"
      @click="next"
    />
    <div
      class="play-btn"
      title="回放"
      @click="play"
    />
    <div
      class="exit-btn"
      title="返回实时视频"
      @click="exit"
    />
  </div>
</template>

<script>
import Rule from './rule';
export default {
  name: 'ProgressBar',
  components: {Rule},
  props:{
    current: {
      type: Date,
      default(){
        return new Date();
      },
    }
  },
  data(){
    return {
      playBackDate: null
    };
  },
  methods:{
    prev(){
      this.$refs.rule.prev();
    },
    next(){
      this.$refs.rule.next();
    },
    ruleChange(...arg){
      this.playBackDate = arg;
    },
    play(){
      this.$emit('playBack', ...this.playBackDate);
    },
    exit(){
      this.$emit('exit');
    }
  }
};
</script>

<style scoped lang="less">
@import "progress-bar";
</style>
