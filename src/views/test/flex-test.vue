<template>
  <div class="wrapper">
    <header class="header">

    </header>
    <div class="page-body">
      <div class="left">
        <div class="left-inner">

        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoExample',
};
</script>
<style scoped lang="less">
  .border{
    border: 1px solid #aaa;
  }
  .wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
    .header{
      height: 200px;
      flex-shrink: 0;
      .border;
    }
    .page-body{
      flex: auto;
      overflow: hidden;
      display: flex;
      .left{
        flex: 1;
        overflow: auto;
        .border;
        .left-inner{
          width: 1000px;
          height: 200px;
          .border;
        }
      }
      .right{
        flex: 1;
        .border;
      }
    }
  }
</style>
