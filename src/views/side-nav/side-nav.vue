<template>
  <ul class="side-nav">
    <li
      v-for="(item, key) in menu"
      :key="'menu' + key"
      class="nav-item"
    >
      <span
        class="label"
        @click="shrink(item)"
      >
        {{ item.label }}
        <i :class="{'el-icon-arrow-up': !item.isShrink, 'el-icon-arrow-down': item.isShrink}"/>
      </span>
      <template v-if="!item.isShrink">
        <div
          v-for="(group, groupKey) in item.children"
          :key="'group' + groupKey"
          class="nav-group"
        >
          <div
            v-if="group.label"
            class="nav-group__title"
            @click.stop="shrink(group)"
          >
            {{ group.label }}
            <i
              v-if="false"
              :class="{'el-icon-arrow-up': !group.isShrink, 'el-icon-arrow-down': group.isShrink}"
            />
          </div>
          <ul
            v-show="!group.isShrink"
            class="sub-nav"
          >
            <li
              v-for="(subItem, subItemKey) in group.children"
              :key="'subItem' + subItemKey"
              class="nav-item"
              :title="subItem.label"
              @click="tap(subItem)"
            >
              <span
                class="label"
                :class="{isShrink: subItem.label === current }"
              >{{ subItem.label }}</span>
            </li>
          </ul>
        </div>
      </template>
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
    },
    shrink(item){
      this.$set(item, 'isShrink', !item.isShrink);
    }
  }
};
</script>

<style scoped lang="less">
  @import "side-nav";
</style>
