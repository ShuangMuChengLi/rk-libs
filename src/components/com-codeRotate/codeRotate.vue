<template>
  <div>
    <button @click="show = true">
      登录
    </button>
    <!-- 引入验证码组件 -->
    <div>
      <identify
        :show.sync="show"
      />
    </div>
  </div>
</template>
<script>
import identify from './com-codeRotate.vue';

export default {
  name: '',
  components: {
    identify
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
  }
};
</script>
 