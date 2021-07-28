# 日历（最简版骨架）
提供了最简易的日历组件骨架。用于后期开发日历热力图、定制化日历等。
## preview
[预览](./index.html#/demo/rk-calendar-demo)
## download
[组件下载](./components/rk-calendar.zip)
## dependence
Vue.js环境

## Attributes
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| v-model | 日历当前的日期 | Date 或可以被Date解析的对象 | - | new Date()  | 
## Events
| 事件名称 |	说明 |回调参数 |
| ---- | ---- |---- | 
| change | 日历日期改变 | date 日历当前日期 | 
## Methods
| 方法名 |	说明 | 参数 |
| ---- | ---- |---- | 
| prev | 翻到上个月 | - | 
| next | 翻到下个月 | - | 
## usage
```
<template>
  <div class="wrapper">
    <rk-calendar
      ref="calendar"
      v-model="date"
      @change="change"
    />
    <p>
      {{ current }}
    </p>
    <p>
      <el-button
        type="primary"
        @click="prev"
      >
        上个月
      </el-button>
      <el-button
        type="primary"
        @click="next"
      >
        下个月
      </el-button>
    </p>
  </div>
</template>

<script>
import RkCalendar from '@/components/rk-calendar/rk-calendar';
import dayjs from 'dayjs';
export default {
  name: 'VueTest',
  components: { RkCalendar },
  data(){
    return {
      date: new Date(),
    };
  },
  computed:{
    current(){
      return dayjs(this.date).format('YYYY-MM-DD');
    }
  },
  methods:{
    prev(){
      this.$refs.calendar.prev();
    },
    next(){
      this.$refs.calendar.next();
    },
    change(date){
      console.log(date);
    }
  }
};
</script>

<style scoped>
  .wrapper{
    width: 500px;
    height: 500px;
  }
</style>


```
