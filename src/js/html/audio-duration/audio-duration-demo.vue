<template>
  <div>
    <audio
      :src="audioUrl"
      controls
    />
    <div>
      音频时长为： {{audioText}}
    </div>
  </div>
</template>

<script>
import audioUrl from './alarmmusic.mp3';
import { getAudioDuration } from './audio-duration';

export default {
  name: 'AudioDurationDemo',
  data() {
    return {
      audioUrl,
      audioText: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.audioText = await getAudioDuration(this.audioUrl);
      console.log(typeof this.audioText);
    }
  }
};
</script>

<style scoped lang="less">

</style>
