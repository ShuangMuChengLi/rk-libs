<template>
  <el-select
    v-model="selectedArr"
    v-defaultSelect="[selectedArr, filterOptions, optionValue, 'disabled', true]"
    multiple
    :size="size"
    :automatic-dropdown="automaticDropdown"
    :placeholder="placeholder"
    @change="changeVal"
  >
    <div class="chose-btns">
      <div
        class="chose-btn"
        @click="allChose"
      >
        <img
          class="chose-img"
          src="./img/all.svg"
        >
        <span class="chose-label">全选</span>
      </div>
      <div
        class="chose-btn"
        @click="clearAll"
      >
        <img
          class="chose-img"
          src="./img/clear.svg"
        >
        <span class="chose-label">清空</span>
      </div>
      <div
        class="chose-btn"
        @click="reverse"
      >
        <img
          class="chose-img"
          src="./img/reverse.svg"
        >
        <span class="chose-label">反选</span>
      </div>
    </div>
    <div class="filter-input">
      <img
        class="chose-img"
        src="./img/search.svg"
      >
      <el-input
        v-model="filterInput"
        placeholder="请输入内容"
        clearable
      />
    </div>
    <div
      ref="list"
      class="option-container"
      @scroll="scrollEvent($event)"
    >
      <div
        class="infinite-list-phantom"
        :style="{ height: listHeight + 'px' }"
      />
      <div
        class="infinite-list"
        :style="{ transform: getTransform }"
      >
        <el-option
          v-for="item in visibleData"
          ref="items"
          :key="item[optionValue]"
          :label="item[optionLabel]"
          :disabled="item.disabled"
          :style="computedDis(item)"
          :value="item[optionValue]"
        />
        <!--rs：无数据情况下，导致下拉框消失-->
        <el-option
          v-if="filterOptions.length == 0"
          key="无数据"
          label="无数据"
          disabled
          value="无数据"
          :style="{color: '#909399', visibility: 'hidden'}"
        />
      </div>
      <div
        v-if="filterOptions.length == 0"
        class="no-data"
      >
        暂无数据
      </div>
    </div>
  </el-select>
</template>

<script>
export default {
  name: 'SelectMore',
  directives: {
    defaultSelect: {
      componentUpdated: function(el, bindings, vnode) {
        //  values v-model 绑定值；options 下拉选项值； prop 对应 options 中的value属性
        // defaultProp 默认值判断属性 ； defaultValue 默认值判断值
        const [values, options, prop, defaultProp, defaultValue] = bindings.value;
        // 需要隐藏的标签索引
        const indexs = [];
        const tempData = values.map(a => options.find(op => op[prop] === a));
        tempData.forEach((a, index) => {
          if (a[defaultProp] === defaultValue) indexs.push(index);
        });
        const dealStyle = function(tags) {
          tags.forEach((el, index) => {
            if (indexs.includes(index) && ![...el.classList].includes('select-tag-close-none')) {
              el.classList.add('none');
              el.parentNode.classList.add('no-chosen-able');
            }
          });
        };
        // 设置样式 隐藏close icon
        const tags = el.querySelectorAll('.el-tag__close');
        if (tags.length === 0) {
          // 初始化tags为空处理
          setTimeout(() => {
            const tagTemp = el.querySelectorAll('.el-tag__close');
            dealStyle(tagTemp);
          });
        } else {
          dealStyle(tags);
        }
      }
    }
  },
  props: {
    // 默认不可选择项
    disabledArr: {
      type: Array,
      default: () => []
    },
    // 默认选择项
    selectedArray: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    // option 对应value
    optionValue: {
      type: String,
      default: 'value'
    },
    // option 对应label
    optionLabel: {
      type: String,
      default: 'label'
    },
    // 每项高度
    itemSize: {
      type: Number,
      default: 34
    },
    // select 样式
    size: {
      type: String,
      default: 'small'
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单
    automaticDropdown: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 过滤输入
      filterInput: '',
      // 选中数据
      selectedArr: [],
      // 必选项：disabled中被选中为必选的数据
      mustSelected: [],
      // 可视区域高度
      screenHeight: 0,
      // 偏移量
      startOffset: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: null
    };
  },
  computed: {
    // 过滤数据
    filterOptions() {
      const data = this.options.filter(item => item.label.indexOf(this.filterInput) !== -1);
      return data;
    },
    // 计算颜色
    computedDis() {
      return function(item) {
        if (item.disabled) {
          return {
            color: '#d0d0d0',
            height: this.itemSize + 'px',
            lineHeight: this.itemSize + 'px'
          };
        }
        return {
          height: this.itemSize + 'px',
          lineHeight: this.itemSize + 'px'
        };
      };
    },
    // el-option 虚拟列表优化
    // 列表总高度
    listHeight() {
      return this.options.length * this.itemSize;
    },
    // 可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize);
    },
    // 偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    // 过滤获取真实显示列表数据
    visibleData() {
      return this.filterOptions.slice(this.start, Math.min(this.end, this.filterOptions.length));
    }
  },
  watch: {
    selectedArr() {
      this.$emit('update:selectedArray', this.selectedArr);
    }
  },
  mounted() {
    this.options.map(item => {
      item.disabled = this.disabledArr.indexOf(item.value) !== -1;
      return;
    });
    // option 选项优化
    this.screenHeight = 170;// this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
    // 逻辑代码，计算必选数据
    this.selectedArr = this.selectedArray;
    this.mustSelected = this.getRepeat(this.selectedArr, this.disabledArr);
  },
  methods: {
    getRepeat(arr1, arr2) {
      let data = [...arr1, ...arr2]; const rs = [];
      data = this.bubbleSort(data);
      data.forEach((item, index) => {
        if (item === data[index + 1]) {
          rs.push(item);
        }
      });
      return rs;
    },
    // 冒泡排序
    bubbleSort(messyArr) {
      for (let i = 0; i < messyArr.length; i++) {
        for (let j = (i + 1); j < (messyArr.length); j++) {
          if (messyArr[i] > messyArr[j]) {
            const temp = messyArr[i];
            messyArr[i] = messyArr[j ];
            messyArr[i + 1] = temp;
          }
        }
      }
      return messyArr;
    },
    // 清空
    clearAll() {
      this.selectedArr = this.mustSelected;
    },
    // 全选
    allChose() {
      this.selectedArr = this.options.map(item => item.value);
    },
    // 反选
    reverse() {
      const valArr = [];
      this.selectedArr.forEach(item => {
        // 如果disabled 存在的，则为 false, 要被选进去
        valArr[item] = (this.disabledArr.indexOf(item) === -1);
      });
      this.selectedArr = [];
      this.options.forEach(item => {
        // 如果不存在
        if (!valArr[item[this.optionValue]]) {
          this.selectedArr.push(item[this.optionValue]);
        }
      });
    },
    // 数据改变的时候
    changeVal() {
      this.$emit('onChange');
    },
    scrollEvent() {
      // 当前滚动位置
      const scrollTop = this.$refs.list.scrollTop;
      // 此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      // 此时的结束索引
      this.end = this.start + this.visibleCount;
      // 此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
    }
  }
};
</script>

<style scoped lang="less">
::v-deep.el-select {
    .el-tag--mini {
      height:21px;
    }
    .none {
        display: none !important;
    }
    .el-tag{
        background: #409EFF;
        color: white;
        .el-icon-close{
            background: #409EFF;
            color: white;
        }
    }
    .no-chosen-able{
        background: #f4f4f5!important;
        color: #909399!important;
    }
    .el-select-dropdown__item.is-disabled{
        color: #d0d0d0!important;
    }
}
.chose-btns{
    display: flex;
    margin: 5px 10px;
    .chose-btn{
        margin-right: 15px;
        cursor: pointer;
        .chose-img{
            width: 20px;
            vertical-align: middle;
        }
        .chose-label{
            font-size: 12px;
        }
    }
}
.filter-input{
    display: flex;
    margin: 5px 10px;
    border-bottom: 1px solid #DCDFE6;
    .chose-img{
        width: 20px;
        vertical-align: middle;
    }
    ::v-deep .el-input__inner{
        border: none;
        height: 30px;
    }
}
.option-container{
    height: 170px;
    overflow: hidden auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}
.infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
}
.no-data{
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    text-align: center;
    color: #cccccc;
}
// 滚动轴样式
::-webkit-scrollbar{
    width: 5px;
    height: 8px;
}
::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.05);
}
::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
