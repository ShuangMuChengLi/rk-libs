<template>
  <select-more
    :options="options"
    :disabled-arr="disabledArr"
    :selected-array.sync="selectedArray"
  />
</template>

<script>
import SelectMore from '@/components/select-more/SelectMore';
export default {
  name: 'SelectMoreDemo',
  components: { SelectMore },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      disabledArr: ['选项1'],
      selectedArray: ['选项1'],
    };
  },
  methods: {}
};
</script>
