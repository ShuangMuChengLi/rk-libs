<!-- 弹出窗体 -->
<template>
  <!-- 弹窗 start -->
  <div ref="mapPopup" class="map-popup-all" v-show="popupShow">
    <div class="map-popup-closer" @click="closePopup">+</div>
    <h3>{{ title || ' ' }}</h3>
    <div id="popup-content"><slot /></div>
  </div>
  <!-- 弹窗 end -->
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
    mapShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    offset: {
      type: Array,
      default: () => {
        return [0, 0];
      }
    }
  },
  data() {
    return {
      popupShow: true,
      dialogOverlay: null
    };
  },
  watch:{
    position: {
      handler () {
        this.reload();
      },
      deep: true
    },
    className: {
      handler () {
        this.reload();
      },
      deep: true
    },
    title: {
      handler () {
        this.reload();
      },
      deep: true
    },
    offset: {
      handler () {
        this.reload();
      },
      deep: true
    },
    mapShow:{
      handler(val){
        this.popupShow = val;
      },
      deep: true,
      immediate: true
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
        element: this.$refs.mapPopup,
        stopEvent: false,
        offset: this.offset || [0, 0],
        className: this.className || 'map-popup',
        autoPanAnimation: {
          duration: 250
        }
      });
      // this.dialogOverlay.setPosition(this.position);
      this.$parent.$data.mapData.addOverlay(this.dialogOverlay);
    },
    /**
     * 关闭弹窗
     */
    closePopup(){
      this.$emit('close', false);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "./map-popup";
</style>

