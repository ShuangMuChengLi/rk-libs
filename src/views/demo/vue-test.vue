<template>
  <div>
    <div>
      <span @click="click">测试</span>
    </div>
  </div>
</template>
<script>
export default {

  methods: {
    click(e) {
      console.log(e);
    },
  }
};
</script>
