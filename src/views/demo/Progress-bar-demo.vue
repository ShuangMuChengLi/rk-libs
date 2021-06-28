<template>
  <div class="home">
    <progress-bar
      :current="progressBarDate"
      @playBack="playBack"
      @exit="progressBarExit"
    />
  </div>
</template>

<script>

import ProgressBar from '@/components/progress-bar/progress-bar';
export default {
  name: 'ProgressBarDemo',
  components: {
    ProgressBar
  },
  data(){
    return {
      progressBarDate: new Date()
    };
  },
  methods:{
    playBack(start, end){
      console.log('播放按钮触发', start, end);
    },
    progressBarExit(){
      console.log('退出按钮触发');
    }
  }
};
</script>
