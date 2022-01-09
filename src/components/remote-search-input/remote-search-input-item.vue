<template>
  <li @click="check">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <span>{{ label }}</span>
    </template>
  </li>
</template>

<script>
export default {
  name: 'RemoteSearchInputItem',
  props:{
    value:{
      type: [String, Number],
      default: null
    },
    label:{
      type: [String, Number],
      default: null
    }
  },
  methods:{
    check(){
      this.$parent.$emit('check', {value: this.value, label:this.label});
    }
  }
};
</script>

<style scoped>

</style>
