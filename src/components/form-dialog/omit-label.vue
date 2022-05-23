<!-- 字数超过省略显示 -->
<template>
  <div>
    <div v-if="label.length <= showNumber">
      {{ label }}
    </div>
    <el-tooltip
      v-if="label.length > showNumber"
      popper-class="popper-class"
      effect="dark"
      :content="label"
      placement="top-start"
    >
      <div>
        {{ util.beyondShowDot(label, showNumber) }}
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { util } from '../../../js/utils/util';

export default {
  name: 'OmitLabel',
  props: {
    label: {
      type: String,
      default: ''
    },
    showNumber: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      util: util
    };
  }
};
</script>
