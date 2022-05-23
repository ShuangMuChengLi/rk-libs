<template>
  <el-table
    class="table"
    :data="data"
    style="width: 100%"
    :height="height"
  >
    <el-table-column
      type="index"
      :index="indexMethod"
    />
    <template v-for="(item, key) in column">
      <el-table-column
        v-if="item.fn"
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
        v-else-if="Array.isArray(item.prop)"
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
        v-else-if="item.slot"
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
      <el-table-column
        v-else-if="item.type === 'array'"
        :key="'tableColumn' + key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <p
            v-for="(subItem, subKey) in scope.row[item.prop]"
            :key="Math.random() + subKey"
          >
            {{ subItem }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="'tableColumn' + key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
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
    height:{
      default: '100%',
      type: String
    },
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
