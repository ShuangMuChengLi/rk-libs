<template>
  <ul class="side-nav">
    <li
      v-for="(item, key) in menu"
      :key="'menu' + key"
      class="nav-item"
    >
      <span class="label">{{ item.label }}</span>
      <div
        v-for="(group, groupKey) in item.children"
        :key="'group' + groupKey"
        class="nav-group"
      >
        <div
          v-if="group.label"
          class="nav-group__title"
        >
          {{ group.label }}
        </div>
        <ul class="sub-nav">
          <li
            v-for="(subItem, subItemKey) in group.children"
            :key="'subItem' + subItemKey"
            class="nav-item"
            @click="tap(subItem)"
          >
            <span
              class="label"
              :class="{active: subItem.label === current }"
            >{{ subItem.label }}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { menu } from '../../../config/menu';
import _ from 'lodash';
export default {
  name: 'Menu',
  data(){
    return {
      current: '时间轴选择器',
      menu: menu,
      menuList: []
    };
  },
  watch:{
    $route:{
      immediate: false,
      handler(){
        this.init();
      }
    }
  },
  mounted () {
    this.init();
  },
  methods:{
    init(){
      this.rebuildMenu(this.menu);
      if(this.$route.params.type){
        let item = _.find(this.menuList, {label: this.$route.params.type});
        this.$emit('change', item.source);
        this.current = item.label;
      }else{
        this.$emit('change', this.menuList[0].source);
        this.current = this.menuList[0].label;
      }
    },
    rebuildMenu(menu){
      for(let item of menu){
        if(item.source){
          this.menuList.push(item);
        }

        if(item.children){
          this.rebuildMenu(item.children);
        }
      }
    },
    tap(item){
      this.$router.push('/detail/' + item.label);
    }
  }
};
</script>

<style scoped lang="less">
  @import "side-nav";
</style>
