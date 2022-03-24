<template>
  <div>
    <div
      v-for="(item , index) in projectRoutes"
      :key="index"
      class="item"
    >
      <router-link
        v-if="!item.children"
        :to="item.path"
      >
        {{ item.path }} --- {{ item.name }}
      </router-link>
      <div v-if="item.children">
        <ul>
          <li
            v-for="subItem in item.children"
            :key="subItem.path"
          >
            <router-link
              :to="item.path + '/' + subItem.path"
            >
              {{ item.path + '/' + subItem.path }} --- {{ subItem.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router';

export default {
  name: 'Order',
  data(){
    return {
      projectRoutes: routes
    };
  }
};
</script>

<style scoped>

</style>
