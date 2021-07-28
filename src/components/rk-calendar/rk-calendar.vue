<template>
  <div class="calendar">
    <table
      class="rk-calendar-table"
      cellspacing="0"
      cellpadding="0"
    >
      <thead>
        <th>周一</th>
        <th>周二</th>
        <th>周三</th>
        <th>周四</th>
        <th>周五</th>
        <th>周六</th>
        <th>周日</th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in list"
          :key="'list' + index"
          class="rk-calendar-table__row"
        >
          <td
            v-for="(subItem, subIndex) in item"
            :key="'item' + index + 'subItem' + subIndex"
            class="prev"
            :class="{
              'is-current-month': !subItem.isCurrentMonth,
              'active': isActive(subItem)
            }"
            @click="change(subItem)"
          >
            <div class="rk-calendar-day">
              <span>{{ subItem.date }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'RkCalendar',
  props:{
    value:{
      default: new Date(),
      type: null
    }
  },
  data(){
    return {
      list: [],
      current: null
    };
  },
  watch:{
    value:{
      immediate: true,
      handler(){
        this.current = new Date(this.value);
        this.init();
      }
    }
  },
  mounted () {

  },
  methods:{
    init(){
      const current = this.current;
      const days = this.getMonthDays(current);
      const prevMonthDate = this.getPrevMonthDate(current);
      const prevMonthDays = prevMonthDate.getDate();
      const firstDayWeekday = this.getFirstDay(current);
      const list = [];
      for(let i = firstDayWeekday - 1; i > 0; i--){
        let date = prevMonthDays - i;
        prevMonthDate.setDate(date);
        list.push({
          date: prevMonthDays - i + 1,
          dateObject: new Date(prevMonthDate),
          isCurrentMonth: false
        });
      }
      for(let i = 1; i <= days; i++){
        let dateObject = new Date(current);
        dateObject.setDate(i);
        list.push(
          {
            date: i,
            dateObject,
            isCurrentMonth: true
          }
        );
      }
      const nextMonthDays = 7 - list.length % 7;
      for(let i = 1; i <= nextMonthDays; i++){
        let dateObject = new Date(current);
        dateObject.setDate(i);
        dateObject.setMonth(dateObject.getMonth() + 1);
        list.push(
          {
            date: i,
            dateObject,
            isCurrentMonth: false
          }
        );
      }
      this.list = this.chunk(list, 7);
    },
    isActive(subItem){
      if(subItem.dateObject.getYear() !== this.current.getYear())return false;

      if(subItem.dateObject.getMonth() !== this.current.getMonth())return false;

      return subItem.dateObject.getDate() === this.current.getDate();
    },
    chunk(arr, num) {
      let result = [];
      if(arr && arr.length){
        let times = Math.ceil(arr.length / num);
        for(let i = 0 ; i < times ; i ++){
          let begin = i * num;
          let end = (i + 1) * num;
          result.push(arr.slice(begin, end));
        }
      }
      return result;
    },
    getMonthDays(date) {
      const d = new Date(date);
      d.setMonth(d.getMonth() + 1);
      d.setDate(0);
      return d.getDate();
    },
    getPrevMonthDate(date) {
      const d = new Date(date);
      d.setDate(0);
      return d;
    },
    getFirstDay(date) {
      const d = new Date(date);
      d.setDate(1);
      return d.getDay();
    },
    change(item){
      this.$emit('input', item.dateObject);
      this.$emit('change', item.dateObject);
    },
    prev(){
      this.current.setDate(1);
      this.current.setMonth(this.current.getMonth() - 1);
      this.$emit('input', new Date(this.current));
      this.init();
    },
    next(){
      this.current.setDate(1);
      this.current.setMonth(this.current.getMonth() + 1);
      this.$emit('input', new Date(this.current));
      this.init();
    }
  }
};
</script>

<style scoped lang="less">
  @import "rk-calendar";
</style>
