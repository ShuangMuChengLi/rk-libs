<template>
  <div class="demo-wrapper">
    <remote-search-input
      v-model="value"
      :label.sync="label"
      :remote-method="remoteMethod"
      placeholder="尝试输入陈或林"
    >
      <remote-search-input-item
        v-for="item of options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span>{{ item.label }}</span>
      </remote-search-input-item>
    </remote-search-input>
  </div>
</template>

<script>
import RemoteSearchInput from './remote-search-input';
import RemoteSearchInputItem from './remote-search-input-item';
export default {
  name: 'RemoteSearchInputDemo',
  components: {RemoteSearchInputItem, RemoteSearchInput},
  data(){
    return {
      options: [],
      label: '',
      value: ''
    };
  },
  methods:{
    remoteMethod(val){
      setTimeout(()=>{
        if(val.includes('林')){
          this.options = [
            {
              label: '林群',
              value: '01',
            },
            {
              label: '林冲',
              value: '02',
            },
          ];
          return;
        }

        if(val.includes('陈')){
          this.options = [
            {
              label: '陈菌',
              value: '03',
            },
            {
              label: '陈伟',
              value: '04',
            }
          ];
          return;
        }

        return [];
      });
    }
  }
};
</script>

<style scoped lang="less">
.demo-wrapper{
  width: 300px;
}
</style>
