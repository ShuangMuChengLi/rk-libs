<template>
  <div>
    <div>
      <el-button @click="writeShow = true">
        打开签名板
      </el-button>
      <!-- 引入签名组件 -->
      <Write
        :show.sync="writeShow"
      />
    </div>
  </div>
</template>
<script>
import Write from './com-signWrite.vue';

export default {
  name: '',
  components: {
    Write
  },
  data() {
    return {
      writeShow: false
    };
  }
};
</script>