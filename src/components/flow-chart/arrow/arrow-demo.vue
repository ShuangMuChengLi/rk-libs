<template>
  <arrow
    class="arrow arrow4"
    :width="254"
    :height="110"
    :path="path"
    color="#000"
  />
</template>

<script>
import Arrow from '@/components/flow-chart/arrow/arrow';
export default {
  name: 'ArrowDemo',
  components: { Arrow },
  data(){
    return {
      path: [
        [254 / 4, 0],
        [254 / 4, 110 / 2],
        [254, 110 / 2]
      ],
    };
  }
};
</script>
