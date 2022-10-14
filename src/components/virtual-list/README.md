# 虚拟列表优化
## contributor
邹双玉
## preview
[预览](./index.html#/components/virtual-list/VirtualListDemo)

## download
[组件下载](./components/virtual-list.zip)


## dependence

Vue.js

## Attributes

## event

## usage

```vue
<template>
  <div class="virtual-list">
    <VirtualList
      v-if="listData.length !== 0"
      v-slot="slotProps"
      :list-data="listData"
      :estimated-item-size="100"
    >
      <p>
        <span style="color: red"> {{ slotProps.item.id }} </span>
        {{ slotProps.item.value }}
      </p>
    </VirtualList>
  </div>
</template>

<script>
import VirtualList from '@/components/virtual-list/VirtualList';

export default {
  name: 'VirtualListDemo',
  components: {
    VirtualList
  },
  data() {
    return {
      listData: []
    };
  },
  mounted() {
    for (let id = 0; id < 1000; id++) {
      this.listData.push({
        id,
        value: '测试文本11111111111111111111111111111'
      });
    }
  }
};
</script>

<style scoped>
.virtual-list{
  height: 500px;
}
</style>

```

