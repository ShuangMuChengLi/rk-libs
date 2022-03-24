<template>
  <div class="wrapper">
    <div class="out">
      <div class="card">
        本来面目
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'VideoExample',
};
</script>
<style scoped lang="less">
.out{
  border: 1px dashed #333;
  width: 100px;
  height: 100px;
  position: relative;
  .card{
    position: absolute;
    transform: matrix(1, 0, 0, 1, 100, 0);
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ff8c66;
  }
}

</style>
