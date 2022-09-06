<template>
  <div
    v-show="value || isMapDialog"
  >
    <div
      class="common-dialog-out-wrapper"
      :class="{center: isCenter, 'not-center': !isCenter, 'map-dialog': isMapDialog}"
      :style="{zIndex: zIndex + 1}"
    >
      <div
        class="common-dialog-wrapper"
        @click="addZIndex"
      >
        <div class="common-dialog-inner">
          <header class="common-dialog-header">
            <slot name="header" />
            <span v-if="!$slots.header">{{ header }}</span>
            <div class="header-ope">
              <slot name="operation" />
              <i
                class="close-icon"
                @click="close"
              />
            </div>
          </header>
          <div class="common-dialog-body">
            <slot />
          </div>
          <footer
            v-if="$slots.footer"
            class="common-dialog-footer"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </div>
    <div
      v-if="isCenter && !isMapDialog"
      :style="{zIndex: zIndex}"
      class="cover"
    />
  </div>
</template>

<script>
import { storageUtil } from '../../js/html/storage-util/storage-util';

export default {
  name: 'CommonDialog',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    isCenter: {
      type: Boolean,
      default: true
    },
    isMapDialog: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: ''
    },
  },
  data(){
    return {
      zIndex: null
    };
  },
  watch:{
	  value: {
      handler(val){
        if(val){
          setTimeout(()=>{
            this.addZIndex();
          }, 100);
        }
      },
      immediate: true
    }
  },
  methods:{
    addZIndex(){
      this.zIndex = storageUtil.getSession('dialogZIndex') || 100;
      storageUtil.setSession('dialogZIndex', this.zIndex + 2);
    },
    close(){
      this.$emit('input', false);
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="less">
  @import "./common-dialog";
</style>
