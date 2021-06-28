<template>
  <div>
    <up-load-files @upDateFiles="upDateFiles" />
  </div>
</template>

<script>
import UpLoadFiles from '@/components/upLoad-files/up-load-files';
export default {
  name: 'UpLoadFilesDemo',
  components: { UpLoadFiles },
  methods: {
    upDateFiles(file) {
      console.log(file);
    }
  }
};
</script>
