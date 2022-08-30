<template>
  <div class="wrapper">
    <div class="inner">
      <div class="inner-body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlexTest',
};
</script>
<style scoped lang="less">
  .border{
    border: 1px solid #aaa;
  }
  .wrapper{
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    .inner {
      display: flex;
      flex: auto;
      .inner-body {
        flex: auto;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>
