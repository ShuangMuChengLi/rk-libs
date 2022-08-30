export const innerDialogMixin = {
  props: {
    visible:{
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
    visible: {
      handler(val) {
        this.dialogVisible = val;
      },
      immediate: true
    },
    dialogVisible: {
      handler(val) {
        this.$emit('update:visible', val);
      },
      immediate: true
    },
  }
};