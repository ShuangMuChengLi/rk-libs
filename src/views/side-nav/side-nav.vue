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

export default {
  name: 'Menu',
  data(){
    return {
      current: '时间轴选择器',
      menu: menu
    };
  },
  mounted () {
    this.$emit('change', require('../../components/progress-bar/README.md'));
  },
  methods:{
    tap(item){
      this.current = item.label;
      this.$emit('change', item.source);
    }
  }
};
</script>

<style scoped lang="less">
  @import "side-nav";
</style>
