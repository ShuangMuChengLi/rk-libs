<template>
  <div
    ref="tableWrapper"
    class="table-wrapper"
  >
    <el-table
      class="table"
      :data="data"
      style="width: 100%"
      height="100%"
      stripe
      @row-click="rowClick"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="hasSelection"
        :header-align="headerAlign"
        type="selection"
        width="55"
      />
      <el-table-column
        label="序号"
        type="index"
        :header-align="headerAlign"
        :index="indexMethod"
      />
      <template v-for="(item, key) in column">
        <el-table-column
          v-if="item.type === 'fn' || item.fn"
          :key="'tableColumn' + key"
          :header-align="headerAlign"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span :style="item.styleFn && item.styleFn(scope.row)">
              {{ item.fn(scope.row) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'img'"
          :key="'tableColumn' + key"
          :header-align="headerAlign"
          :prop="item.prop"
          :label="item.label"
          width="130px"
        >
          <template slot-scope="scope">
            <el-image
              v-if="scope.row[item.prop]"
              :src="scope.row[item.prop]"
              alt=""
              class="img"
              fit="contain"
              @click="imgClick(scope.row, scope.$index, item.prop)"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'Array' || Array.isArray(item.prop)"
          :key="'tableColumn' + key"
          :header-align="headerAlign"
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
          v-else-if="item.type === 'slot' || item.slot"
          :key="'tableColumn' + key"
          :header-align="headerAlign"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot
              :name="item.slot"
              :row="scope.row"
              :$index="scope.$index"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'popover'"
          :key="'tableColumn' + key"
          :header-align="headerAlign"
          :prop="item.prop"
          :label="item.label"
          :width="item.width === undefined ? 250 : item.width"
        >
          <template slot-scope="scope">
            <el-popover
              placement="right"
              :width="250"
              trigger="hover"
              :content="scope.row[item.prop]"
            >
              <div
                slot="reference"
                class="content-table-row"
              >
                {{ scope.row[item.prop] }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.linkFn"
          :key="'tableColumn' + key"
          :header-align="headerAlign"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span
              class="link"
              @click="item.linkFn(scope.row)"
            >{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="!item.type || item.type === 'normal'"
          :key="'tableColumn' + key"
          :header-align="headerAlign"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
      </template>
      <slot />
    </el-table>
    <div class="page-wrapper">
      <el-pagination
        class="page-default"
        :current-page="pageInfo.pageId"
        :page-sizes="pageSizes"
        :page-size="pageInfo.pageSize"
        :pager-count="5"
        :layout="layout"
        :total="total"
        @current-change="pageChange"
        @size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import {tableIndexMixin} from './table-index-mixin';
export default {
  name: 'CommonTable',
  mixins:[ tableIndexMixin ],
  props:{
    hasSelection:{
      default: false,
      type: Boolean
    },
    total:{
      default: 0,
      type: Number
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
	  pageSizes: {
		  default(){
			  return [10, 20, 60, 120];
		  },
		  type: Array
	  },
    pageInfo:{
      default(){
        return {
          pageId: 1,
          pageSize: 10,
        };
      },
      type: Object
    },
    layout:{
      default: 'total, sizes, prev, pager, next, jumper',
      type: String
    },
    headerAlign:{
      default: null,
      type: String
    }
  },
  data() {
    return {
			
    };
  },
  methods:{
    pageChange(val){
      let pageInfo = {
        pageId: val,
        pageSize: this.pageInfo.pageSize,
      };
      this.$emit('update:pageInfo', pageInfo);
      this.$emit('pageChange', pageInfo);
    },
    pageSizeChange(val){
      let pageInfo = {
        pageId: 1,
        pageSize: val,
      };
      this.$emit('update:pageInfo', pageInfo);
      this.$emit('pageChange', pageInfo);
    },
    imgClick(row, index, prop){
      this.$emit('imgClick', row, index, prop);
    },
    rowClick(item){
      this.$emit('rowClick', item);
    },
    selectionChange(val){
      this.$emit('selectionChange', val);
    }
  }
};
</script>

<style scoped lang="less">
  .table-wrapper{
    flex: 1376;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
  }
  .page-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    flex-shrink: 0;
  }
  .img{
    width: 100px;
    height: 100px;
    background-color: rgba(0,0,0,0.6);
  }
  .content-table-row{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
