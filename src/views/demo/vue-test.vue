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
