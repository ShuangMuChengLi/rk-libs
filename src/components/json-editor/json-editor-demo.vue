<template>
  <json-editor
    v-model="value"
    mode="code"
    lang="zh"
    :expanded-on-start="true"
  />
</template>

<script>
import JsonEditor from './json-editor.vue';
export default {
  name: 'RouterMenuDemo',
  components: {
    JsonEditor
  },
  data() {
    return {
      value:{
        a:{
          b:[
            {
              c:1,
              d:true,
              e:'string'
            }
          ]
        }
      }
    };
  },
  methods: {

  }
};
</script>
