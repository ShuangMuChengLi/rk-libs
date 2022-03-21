<template>
  <div v-if="value || isMapDialog">
    <div
      class="common-dialog"
      :class="{center: !isMapDialog}"
      :style="{width: width, height: height}"
    >
      <header class="common-dialog-header">
        <span>{{ header }}</span>
        <i
          class="el-icon-close"
          @click="close"
        />
      </header>
      <slot />
      <i
        v-if="isMapDialog"
        class="tail"
      />
    </div>
    <div
      v-if="hasCover && !isMapDialog"
      class="cover"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonDialog',
  props: {
    value:{
      default: false,
      type: Boolean
    },
    header:{
      default: '',
      type: String
    },
    width:{
      default: null,
      type: String
    },
    height:{
      default: null,
      type: String
    },
    hasCover:{
      default: false,
      type: Boolean
    },
    isMapDialog:{
      default: false,
      type: Boolean
    }
  },
  methods:{
    close(){
      this.$emit('input', false);
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="less">
  @import "common-dialog";
</style>
