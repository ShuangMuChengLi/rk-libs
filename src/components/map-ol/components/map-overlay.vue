<!-- 自定义覆盖物 -->
<template>
  <!-- Overlay start -->
  <div
    ref="overlayMain"
    class="overlay-main"
  >
    <slot />
  </div>
  <!-- Overlay end -->
</template>

<script>
import Overlay from 'ol/Overlay';
export default {
  name: 'MapOverlay',
  props: {
    position: {
      type: Array,
      default: () => {
        return [0, 0];
      }
    },
    className: {
      type: String,
      default: ''
    },
    offset:{
      type: Array,
      default: () => {
        return [0, 0];
      }
    }
  },
  data() {
    return {
      dialogOverlay: null
    };
  },
  watch:{
    position: {
      handler (val) {
        this.reload();
      },
      deep: true
    },
    className: {
      handler (val) {
        this.reload();
      },
      deep: true
    },
    offset: {
      handler (val) {
        this.reload();
      },
      deep: true
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.reload();
    });
  },
  methods:{
    reload(){
      if(this.dialogOverlay) {
        this.$parent.$data.mapData.removeOverlay(this.dialogOverlay);
      }
      this.dialogOverlay = new Overlay({
        position: this.position,
        element: this.$refs.overlayMain,
        stopEvent: false,
        offset: this.offset || [0, 0],
        className: this.className || 'map-overlay'
      });
      this.$parent.$data.mapData.addOverlay(this.dialogOverlay);
    }
  }
};
</script>
