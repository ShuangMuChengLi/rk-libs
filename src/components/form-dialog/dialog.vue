<!-- 表单弹窗 -组件 -->
<template>
  <el-dialog
    v-dialogDrag
    class="form-dialog-page"
    :title="title"
    :visible.sync="dialogVisible"
    width="680px"
    :before-close="close"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="dialog-content">
      <el-form
        ref="dialogRef"
        :model="dialog"
        :rules="rules"
      >
        <div
          v-for="(item, index) in fields"
          :key="'dialog' + index"
        >
          <el-form-item
            :label="item.label"
            :prop="item.name"
            label-width="140px"
          >
            <!-- input -->
            <el-input
              v-if="item.type === 'input'"
              v-model="dialog[item.name]"
              autocomplete="off"
              :disabled="item.options.disabled"
            />

            <!-- select -->
            <el-select
              v-if="item.type === 'select'"
              v-model="dialog[item.name]"
              placeholder="请选择"
              clearable
              :disabled="item.options.disabled"
            >
              <el-option
                v-for="(row, rowIndex) in item.items"
                :key="rowIndex"
                :label="row.label"
                :value="row.value"
              />
            </el-select>

            <!-- select -->
            <el-select
              v-if="item.type === 'select-multiple'"
              v-model="dialog[item.name]"
              multiple
              clearable
              placeholder="请选择"
              :disabled="item.options.disabled"
            >
              <el-option
                v-for="(row, rowIndex) in item.items"
                :key="rowIndex"
                :label="row.label"
                :value="row.value"
              />
            </el-select>

            <!-- select-custom -->
            <el-select
              v-if="item.type === 'select-custom'"
              v-model="dialog[item.name]"
              placeholder="请选择"
              clearable
              :loading="item.items.length === 0"
              :disabled="item.options.disabled"
              @change="(val) => selectCustomChange(val, item.name)"
            >
              <el-option
                v-for="row in item.items"
                :key="row.value"
                :label="row.label"
                :value="row.value"
              >
                <span style="float: left">{{ row.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ row.value }}</span>
              </el-option>
            </el-select>

            <!-- filter-select -->
            <el-select
              v-if="item.type === 'filter-select'"
              v-model="dialog[item.name]"
              filterable
              clearable
              placeholder="请选择"
              :disabled="item.options.disabled"
            >
              <el-option
                v-for="row in item.items"
                :key="row.value"
                :label="row.label"
                :value="row.value"
              />
            </el-select>

            <!-- group-select -->
            <el-select
              v-if="item.type === 'group-select'"
              v-model="dialog[item.name]"
              filterable
              placeholder="请选择"
              :disabled="item.options.disabled"
            >
              <el-option-group
                v-for="(group, groupIndex) in item.items"
                :key="item.name + groupIndex"
                :label="group.label"
              >
                <el-option
                  v-for="(row, rowIndex) in group.options"
                  :key="item.name + rowIndex + row.value"
                  :label="row.label"
                  :value="row.value"
                />
              </el-option-group>
            </el-select>

            <!-- tree-select -->
            <tree-select
              v-if="item.type === 'tree-select'"
              :key="(new Date()).getTime()"
              v-model="dialog[item.name]"
              :data="item.items"
              :default-props="defaultProps"
              node-key="id"
              :checked-keys="item.options.initialValue"
              :disabled="item.options.disabled"
              @popoverHide="(val) => selectPopoverHide(val, item.name)"
            />

            <!-- cascader -->
            <el-cascader
              v-if="item.type === 'cascader'"
              v-model="dialog[item.name]"
              :options="item.items"
              :props="item.options.props ? item.options.props : idProps"
              :show-all-levels="false"
              clearable
            />

            <!-- number -->
            <el-input
              v-if="item.type === 'number'"
              v-model.number="dialog[item.name]"
              type="number"
              autocomplete="off"
              :disabled="item.options.disabled"
            />

            <!-- textarea -->
            <el-input
              v-if="item.type === 'textarea'"
              v-model="dialog[item.name]"
              autosize
              type="textarea"
              autocomplete="off"
              :disabled="item.options.disabled"
            />

            <!-- switch -->
            <el-switch
              v-if="item.type === 'switch'"
              v-model="dialog[item.name]"
              :disabled="item.options.disabled"
              active-color="#13ce66"
              active-text="启用"
              inactive-text="禁用"
            />

            <!-- date -->
            <el-date-picker
              v-if="item.type === 'date'"
              v-model="dialog[item.name]"
              :disabled="item.options.disabled"
              type="date"
            />

            <!-- date-time -->
            <el-date-picker
              v-if="item.type === 'date-time'"
              v-model="dialog[item.name]"
              :disabled="item.options.disabled"
              type="datetime"
            />

            <!-- upload -->
            <el-upload
              v-if="item.type === 'upload'"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :auto-upload="false"
              :disabled="item.options.disabled"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>

            <!-- popover -->
            <el-popover
              v-if="item.options.popover"
              placement="top-start"
              :title="item.options.popover.title"
              trigger="hover"
              :content="item.options.popover.content"
              :disabled="item.options.disabled"
            >
              <i
                slot="reference"
                class="el-icon-question"
              />
            </el-popover>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close()">
        取 消
      </el-button>
      <el-button
        v-if="type !== 'look'"
        type="primary"
        @click="dialogSave()"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeSelect from './../../common/tree-select/index'; // 树形下拉列表
export default {
  name: 'FormDialog',
  components: {
    TreeSelect
  },
  props: {
    visible:{
      type: Boolean,
      default: false
    },
    title: {
      type:String,
      default: ''
    },
    fields: {
      type: Array,
      required: true
    },
    type: {
      type:String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialog: {},
      rules: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      imageUrl: '',
      idProps: {
        value: 'id',
        label: 'text',
        checkStrictly: true
      }
    };
  },
  watch: {
    visible: {
      handler(val){
        if (!val) return false;

        this.dialogVisible = val;
        for(let key in this.fields){
          if (this.dialog[key]) delete this.dialog[key];
        }
        for (const item of this.fields) {
          // this.dialog[item.name] = item.options.initialValue;
          this.$set(this.dialog, item.name, item.options.initialValue); // 通过this.$set()的方式来将对象进行响应式的赋值
          this.rules[item.name] = item.options.rules;
        }
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    /**
     * 关闭
     */
    close() {
      this.$refs['dialogRef'].resetFields(); // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.dialogVisible = false;
      this.$emit('onClose');
      this.$emit('update:visible', false);
    },
    /**
     * 保存
     * */
    dialogSave() {
      this.$refs['dialogRef'].validate((valid) => {
        if (valid) {
          this.$emit('onDialogSave', this.dialog);
          this.dialogVisible = false;
          this.$emit('update:visible', false);
        } else {
          this.$message.info('请填写表单必填项');
          return false;
        }
      });
    },
    /**
     * 下拉框关闭
     * */
    selectPopoverHide(val, name) {
      this.search[name] = val;
    },
    /**
     * 下拉框change
     * @param val 下拉框的值
     * @param keyName 下拉框表单键值
     */
    selectCustomChange(val, keyName) {
      this.$emit('onSelectCustomChange', val, keyName);
    },
    /**
     * 清空表单某个键值
     * @param name
     */
    clearFormItem(name) {
      this.$set(this.dialog, name, '');
    }
  }
};
</script>

<style scoped lang="less">
  @import "./dialog";
</style>
