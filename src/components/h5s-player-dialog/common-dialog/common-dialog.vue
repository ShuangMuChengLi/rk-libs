<template>
  <div
    v-show="visible"
    class="common-dialog"
    :class="[{'setCenter': isCenter},
             { 'active': isShowDialog},
             { 'left': dialogPosition === 'left'},
             { 'right': dialogPosition === 'right'}
    ]"
    :style="{ 'z-index': zIndex }"
    @click.stop
  >
    <i
      class="close-icon close-icon_1"
      @click="close"
    />
    <div class="ci-body">
      <div class="title-top">
        <div class="title-content">
          {{ title }}
        </div>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonDialog',
  props:{
    visible:{
      default: true,
      type: Boolean
    },
    title:{
      default: '',
      type: String
    },
    isCenter:{
      default: true,
      type: Boolean
    },
    dialogPosition:{
      default: '',
      type: String
    },
  },
  data(){
    return{
      zIndex: 100,
      isShowDialog: false,
    };
  },
  watch:{
    visible:{
      handler(newVal){
        if(!newVal){
          this.isShowDialog = false;
          return;
        }

        this.$nextTick(()=>{
          this.isShowDialog = newVal;
        });
      },
      immediate: true
    }
  },
  methods:{
    close(){
      this.$emit('close');
    },
  }
};
</script>

<style scoped lang="less">
  @import "common-dialog";
</style>
