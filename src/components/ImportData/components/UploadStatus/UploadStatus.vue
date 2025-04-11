<template>
  <div class="flex-column-center">
    <el-image :src="icon" />
    <p class="title">
      {{ title.title }}
    </p>
    <p class="message">
      {{ msg }} <el-button
        v-if="showError"
        type="text"
        @click="$emit('show-error-detail')"
      >
        查看错误数据
      </el-button>
    </p>
    <el-button
      class="btn-bottom"
      type="primary"
      @click="done"
    >
      {{ title.btnText }}
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'UploadStaus',
  components: {},
  mixins: [],
  props: {
    status: {
      type: String,
      default() {
        return '';
      }
    },
    msg: {
      type: String,
      default() {
        return '';
      }
    },
    showError: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      successIcon: require('./images/success.png'),
      errorIcon: require('./images/error.png')
    };
  },
  computed: {
    icon() {
      switch (this.status) {
      case 'success':
        return this.successIcon;
      case 'error':
      default:
        return this.errorIcon;
      }
    },
    title() {
      switch (this.status) {
      case 'success':
        return {
          title: '数据导入完成',
          btnText: '完成'
        };
      case 'error':
      default:
        return {
          title: '导入数据出现错误',
          btnText: '知道了'
        };
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    done() {
      this.$emit('done');
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'UploadStatus.scss';
</style>
