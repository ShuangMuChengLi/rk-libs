<template>
  <el-table
    class="table"
    :data="data"
    style="width: 100%"
    height="100%"
  >
    <el-table-column
      type="index"
      :index="indexMethod"
    />
    <template v-for="(item, key) in column">
      <el-table-column
        v-if="!item.slot && (typeof item.prop === 'string') && !item.fn"
        :key="'tableColumn' + key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
      <el-table-column
        v-if="!item.slot && item.fn"
        :key="'tableColumn' + key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          {{ item.fn(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!item.slot && Array.isArray(item.prop)"
        :key="'tableColumn' + key"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <p
            v-for="prop in item.prop"
            :key="Math.random() + prop"
          >
            {{ scope.row[prop] }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="item.slot"
        :key="'tableColumn' + key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <slot
            :name="item.slot"
            :row="scope.row"
          />
        </template>
      </el-table-column>
    </template>
    <slot />
  </el-table>
</template>

<script>
import {tableIndexMixin} from './table-index-mixin';
export default {
  name: 'CommonTable',
  mixins:[ tableIndexMixin ],
  props:{
    column:{
      default(){
        return [];
      },
      type: Array
    },
    data:{
      default(){
        return [];
      },
      type: Array
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped lang="less">
.table{
  border: 1px solid #dedede;
}
</style>
