<template>
  <div
    class="container"
    :class="{ 'border-bottom': border }"
  >
    <div class="idx inline-block">
      <span>{{ index }}</span>
    </div>
    <div class="detail inline-block margin-l-10">
      <p class="title font-16 font-bold">
        {{ title }}
      </p>
      <p class="desc font-14">
        {{ desc }}
      </p>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'StepItem',
  components: {},
  mixins: [],
  props: {
    border: {
      type: Boolean,
      default() {
        return false;
      }
    },
    index: {
      type: Number,
      default() {
        return 1;
      }
    },
    title: {
      type: String,
      default() {
        return '';
      }
    },
    desc: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import 'StepItem.scss';
</style>
