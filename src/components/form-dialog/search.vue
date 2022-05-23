<template>
  <div class="form-search-page">
    <el-form
      ref="searchRef"
      :inline="true"
      :model="search"
    >
      <el-form-item
        v-for="(item, index) in fields"
        :key="'search' + index"
        :label="item.label"
        :prop="item.name"
      >
        <!-- input -->
        <el-input
          v-if="item.type === 'input'"
          v-model="search[item.name]"
          :placeholder="item.initialValue"
        />

        <!-- select -->
        <el-select
          v-if="item.type === 'select'"
          v-model="search[item.name]"
          :placeholder="item.initialValue"
        >
          <el-option
            v-for="(row, rowIndex) in item.items"
            :key="rowIndex"
            :label="row.label"
            :value="row.value"
          />
        </el-select>

        <!-- tree-select -->
        <tree-select
          v-if="item.type === 'tree-select'"
          :key="(new Date()).getTime()"
          v-model="search[item.name]"
          :data="item.items"
          :default-props="defaultProps"
          node-key="id"
          :checked-keys="item.initialValue"
          @popoverHide="(val) => selectPopoverHide(val, item.name)"
        />

        <!-- date -->
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="search[item.name]"
          type="date"
          placeholder="选择日期"
        />

        <!-- date-range -->
        <el-date-picker
          v-if="item.type === 'date-range'"
          v-model="search[item.name]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />

        <!-- datetime-range -->
        <el-date-picker
          v-if="item.type === 'datetime-range'"
          v-model="search[item.name]"
          type="datetimerange"
          :picker-options="item.pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />

        <!-- group-select -->
        <el-select
          v-if="item.type === 'group-select'"
          v-model="search[item.name]"
          filterable
          placeholder="请选择"
        >
          <el-option-group
            v-for="group in item.items"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="row in group.options"
              :key="row.value"
              :label="row.label"
              :value="row.value"
            />
          </el-option-group>
        </el-select>

        <!-- cascader -->
        <el-cascader
          v-if="item.type === 'cascader'"
          v-model="search[item.name]"
          :options="item.items"
          :props="idProps"
          :show-all-levels="false"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSearch"
        >
          查询
        </el-button>
        <el-button
          plain
          @click="onReset"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TreeSelect from './../../common/tree-select/index'; // 树形下拉列表
export default {
  name: 'FormSearch',
  components: {
    TreeSelect
  },
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      search: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      idProps: {
        value: 'id',
        label: 'text',
        checkStrictly: true
      }
    };
  },
  watch: {
    fields: {
      handler(newName) {
        // if (!newName) return false;

        /*for (let item of this.fields) {
          this.search[item.name] = item.initialValue;
        }*/
        for(let key in this.search){
          delete this.search[key];
        }
        // console.log(this.search);
        this.onReset();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * 搜索
     * */
    onSearch() {
      this.$emit('onSearch', this.search);
    },
    /**
     * 清空
     * */
    onReset() {
      // this.$refs['searchRef'].resetField();
      for(let key in this.search){
        // console.log(key);
        if (Array.isArray(this.search[key])) {
          this.search[key] = [];
        } else {
          this.search[key] = '';
        }
      }
      // console.log(this.search);
      this.onSearch();
    },
    /**
     * 下拉框关闭
     * */
    selectPopoverHide(val, name) {
      this.search[name] = val;
    }
  }
};
</script>

<style scoped lang="less">
  @import "./search.less";
</style>
