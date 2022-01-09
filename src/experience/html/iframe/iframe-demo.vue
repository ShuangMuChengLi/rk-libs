<template>
  <div>
    <iframe
      id="iframe"
      :srcdoc="srcdoc"
    />
  </div>
</template>

<script>
export default {
  name: 'IframeDemo',
  data(){
    return {
      srcdoc: '<h1>test</h1>'
    };
  },
  mounted () {
  }
};
</script>

<style scoped>

</style>
