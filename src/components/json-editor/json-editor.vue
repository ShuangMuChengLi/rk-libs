<template>
  <div>
    <div class="jsoneditor-vue" />
    <div 
      v-if="showBtns!==false" 
      class="jsoneditor-btns"
    >
      <button
        class="json-save-btn"
        type="button"
        :disabled="error"
        @click="onSave()"
      >
        {{ locale[lang].save }}
      </button>
    </div>
  </div>
</template>

<script>
import 'jsoneditor/dist/jsoneditor.css';
import JsonEditor from 'jsoneditor';
export default {
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: ''
    },
    showBtns: [Boolean],
    expandedOnStart: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'tree'
    },
    modes: {
      type: Array,
      default: function () {
        return ['tree', 'code', 'form', 'text', 'view'];
      }
    },
    lang: {
      type: String,
      default: 'zh'
    }
  },
  data() {
    return {
      editor: null,
      error: false,
      json: this.value,
      internalChange: false,
      expandedModes: ['tree', 'view', 'form'],
      locale: {
        it: {
          save: 'SALVA'
        },
        en: {
          save: 'SAVE'
        },
        zh: {
          save: '保存'
        }
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      async handler(val) {
        if (!this.internalChange) {
          await this.setEditor(val);

          this.error = false;
          this.expandAll();
        }
      },
      deep: true
    }
  },
  mounted() {
    let self = this;

    let options = {
      mode: this.mode,
      modes: this.modes, // allowed modes
      onChange() {
        try {
          let json = self.editor.get();
          self.json = json;
          self.error = false;
          self.$emit('json-change', json);
          self.internalChange = true;
          self.$emit('input', json);
          self.$nextTick(function () {
            self.internalChange = false;
          });
        } catch (e) {
          self.error = true;
          self.$emit('has-error', e);
        }
      },
      onModeChange() {
        self.expandAll();
      }
    };

    this.editor = new JsonEditor(
      this.$el.querySelector('.jsoneditor-vue'),
      options,
      this.json
    );
  },
  methods: {
    expandAll() {
      if (
        this.expandedOnStart &&
        this.expandedModes.includes(this.editor.getMode())
      ) {
        this.editor.expandAll();
      }
    },

    onSave() {
      this.$emit('json-save', this.json);
    },

    async setEditor(value) {
      if (this.editor) this.editor.set(value);
    }
  }
};
</script>

<style scoped>
  .ace_line_group {
    text-align: left;
  }
  .json-editor-container {
    display: flex;
    width: 100%;
  }
  .json-editor-container .tree-mode {
    width: 50%;
  }
  .json-editor-container .code-mode {
    flex-grow: 1;
  }
  .jsoneditor-btns{
    text-align: center;
    margin-top:10px;
  }
  .jsoneditor-vue .jsoneditor-outer{
    min-height:150px;
  }
  .jsoneditor-vue div.jsoneditor-tree{
    min-height: 350px;
  }
  .json-save-btn{
    background-color: #20A0FF;
    border: none;
    color:#fff;
    padding:5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  .json-save-btn:focus{
    outline: none;
  }
  .json-save-btn[disabled]{
    background-color: #1D8CE0;
    cursor: not-allowed;
  }
  code {
    background-color: #f5f5f5;
  }
</style>
