export const innerDialogMixin = {
  props: {
    value: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      dialogVisible: false,
    };
  },

  watch: {
    value: {
      handler(val) {
        this.dialogVisible = val;
      },
      immediate: true
    },
    dialogVisible: {
      handler(val) {
        this.$emit('input', val);
      },
      immediate: true
    },
  }
};