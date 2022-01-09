<template>
  <el-image
    class="remote-img"
    fit="contain"
    :style="getStyle"
    :src="localSrc"
  >
    <div slot="placeholder" class="image-slot">
      加载中<span class="dot">...</span>
    </div>
  </el-image>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RemoteImg',
  props:{
    width: {
      type: String,
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    src: {
      type: String,
      default: null,
    },
    headers:  {
      type: Object,
      default(){
        return {};
      },
    },
  },
  data(){
    return {
      localSrc: null
    };
  },
  computed:{
    getStyle(){
      let style = {};
      let build = (key)=>{
        if(!this[key])return;

        if(typeof this[key] === 'string'){
          if(this[key].includes('px') || this[key].includes('%')){
            style[key] = this[key];
          }else{
            style[key] = this[key] + 'px';
          }
        }else{
          style[key] = this[key] + 'px';
        }
      };
      build('width');
      build('height');
      return style;
    }
  },
  watch:{
    src: {
      handler(val){
        this.getLocalSrc(val);
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods:{
    getLocalSrc(val){
      if(!val)return;

      axios.get(val, {headers: this.headers, responseType: 'blob'}).then((res)=>{
        let blob = new Blob([res.data], {type: 'image/jpeg'});
        this.localSrc = window.URL.createObjectURL(blob);
      });
    }
  }
};
</script>

<style scoped lang="less">
  .remote-img{
    width: 100%;
    height: 100%;
  }
</style>
