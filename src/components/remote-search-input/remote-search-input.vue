<template>
  <div
    class="remote-search-input-wrapper"
    @click.stop
  >
    <el-input
      ref="input"
      v-model="inputValue"
      clearable
      :readonly="readonly"
      :placeholder="placeholder"
      @focus="boxShow"
      @input="input"
      @keydown.native.enter="keydown"
    />
    <ul
      v-if="boxVisible"
      class="select-box"
    >
      <slot />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RemoteSearchInput',
  props:{
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: [String, Number],
      default: null
    },
    remoteMethod: {
      type: Function,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      inputValue: '',
      boxVisible: false
    };
  },
  watch:{
    label:{
      handler(){
        this.inputValue = this.label;
      },
      immediate: true
    }
  },
  mounted() {
    this.$on('check', this.check);
    window.addEventListener('click', this.hideBox);
  },
  beforeDestroy(){
    window.removeEventListener('click', this.hideBox);
  },
  methods:{
    input(val){
      if(this.readonly)return;

      this.remoteMethod(val);
    },
    boxShow(){
      if(this.readonly)return;

      this.boxVisible = true;
    },
    hideBox(){
      if(this.readonly)return;

      this.boxVisible = false;
    },
    check(item){
      this.hideBox();
      this.$refs.input.blur();
      this.inputValue = item.label;
      this.$emit('update:label', this.inputValue);
      this.$emit('input', item.value);
      this.$emit('change', item.value, item);
    },
    keydown(){
      this.hideBox();
      this.$refs.input.blur();
      this.$emit('input', null);
      this.$emit('change', null, {
        value: null,
        label: this.inputValue
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "remote-search-input";
</style>
