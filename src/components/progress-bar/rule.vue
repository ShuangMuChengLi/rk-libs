<template>
  <canvas
    :id="id"
    :width="width"
    :height="height"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @mouseleave="mouseleave"
    @click="click"
    @drag.prevent
    @dragstart.prevent
    @drop.prevent
  />
</template>

<script>
import moment from 'moment';
const HOUR = 3600 * 1000;// 一小时的毫秒数
const HOUR_QUARTERS = 12; // 一小时几等分
const QUARTER = 3600 * 1000 / HOUR_QUARTERS; // 一等分的毫秒数
const SCALE_HOURS = 2.1; // 刻度尺有几小时
const SCALE_QUARTERS = SCALE_HOURS * HOUR_QUARTERS; // 刻度尺有几等分
const SCALE_BEGIN_Y = 20; // 刻度的起始点y坐标
const SCALE_END_Y = 40; // 刻度的结束点y坐标
export default {
  name: 'Rule',
  props:{
    id:{
      default: 'rule',
      type: String
    },
    width:{
      default: 570,
      type: Number
    },
    height:{
      default: 60,
      type: Number
    },
    current: {
      default(){
        return new Date();
      },
      type: Date
    }
  },
  data(){
    return {
      min: null,
      max: null,
      canvas: null,
      ctx: null,
      offset: 0, // 第一个刻度到起始点的距离
      offsetQuarter: 0, // 第一个刻度到起始点的偏移的毫秒数
      unitQuarterWidth: 0, // 刻度间距宽度
      unitPxMS: 0, // 每像素的毫秒数
      currentTimestamp: null, // 中心点的时间戳
      minTimestamp: null, // 最小的时间戳
      maxTimestamp: null, // 最大的时间戳
      beginTimestamp: null, // 起始点的时间戳
      endTimestamp: null, // 结束点的时间戳
      isDragging: false,
      moveAmount: 0,
      timer: null,
      mousedownPoint:[],
      messageTimer: null,

      inertiaTimer: null,
      inertiaTargetTimer: null,
    };
  },
  watch:{
    current:{
      handler(){
        this.envChange();
      },
      immediate: false
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.mouseup);
    document.removeEventListener('mousemove', this.documentMousemove);
    cancelAnimationFrame(this.inertiaTimer);
    cancelAnimationFrame(this.inertiaTargetTimer);
  },
  methods:{
    init(){
      this.canvas = document.getElementById(this.id);
      this.ctx = this.canvas.getContext('2d');
      this.unitQuarterWidth = this.width / SCALE_QUARTERS; // 每个刻度长度
      this.unitPxMS = (SCALE_HOURS * HOUR) / this.width; // 每像素的毫秒数
      this.initEnv();
      this.draw();
      document.addEventListener('mouseup', this.mouseup);
      document.addEventListener('mousemove', this.documentMousemove);
    },
    initEnv(){
      this.currentTimestamp = this.current.getTime(); // 初始化时间戳
      this.min = moment(this.current).subtract(1, 'day').toDate();
      this.max = moment(this.current).add(1, 'day').toDate();
      if(this.max.getTime() > new Date().getTime()){
        this.max = new Date();
      }
      this.$emit('change', new Date(this.currentTimestamp), this.max);
    },
    envChange(){
      this.initEnv();
      this.draw();
    },
    draw(){
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.beginTimestamp = this.currentTimestamp - HOUR * SCALE_HOURS / 2;
      this.endTimestamp = this.currentTimestamp + HOUR * SCALE_HOURS / 2;

      this.minTimestamp = this.min.getTime();
      this.maxTimestamp = this.max.getTime();
      this.offsetMS = QUARTER - (this.beginTimestamp % QUARTER);
      this.offset = this.unitQuarterWidth * (this.offsetMS / QUARTER);
      this.drawLines();
      this.drawCurrent();
    },
    verify(){
      if(this.currentTimestamp > this.maxTimestamp){
        this.currentTimestamp = this.maxTimestamp;
        clearTimeout(this.messageTimer);
        if(!this.messageTimer){
          this.$message.success('已经拖动到当前时间了');
        }
        this.messageTimer = setTimeout(()=>{
          this.messageTimer = null;
        }, 100);
        return false;
      }

      if(this.currentTimestamp < this.minTimestamp){
        this.currentTimestamp = this.minTimestamp;
        clearTimeout(this.messageTimer);
        if(!this.messageTimer){
          this.$message.success('已经拖动到最早了');
        }
        this.messageTimer = setTimeout(()=>{
          this.messageTimer = null;
        }, 100);
        return false;
      }

      return true;
    },
    move(timestamp){
      this.currentTimestamp = timestamp;
      let result = this.verify();
      this.draw();
      return result;
    },
    drawLines(){
      for(let i = 0; i < SCALE_QUARTERS; i++){
        const x = this.unitQuarterWidth * i + this.offset;
        this.drawLine([x, SCALE_BEGIN_Y], [x, SCALE_END_Y]);
        let itemTimestamp = this.beginTimestamp + this.offsetMS + QUARTER * i;
        if(itemTimestamp % HOUR === 0 || itemTimestamp % HOUR === HOUR / 2){
          let text = this.getText(itemTimestamp);
          this.drawText(text, [this.getTextOffset(x, text.length), SCALE_END_Y + 7]);
        }
      }
    },
    drawCurrent(){
      let x = this.width / 2;
      this.drawLine([x, SCALE_BEGIN_Y - 5], [x, SCALE_END_Y + 5], '#0fb8ed');
      let text = moment(this.currentTimestamp).format('YYYY-MM-DD HH:mm:ss');
      this.drawText(text, [this.getTextOffset(x, text.length), SCALE_BEGIN_Y - 3], null, 'bottom');
    },
    getTextOffset(x, textLength){
      return x - textLength / 2 * 6;
    },
    drawLine(start, end, style){
      this.ctx.beginPath(); //新建一条path
      this.ctx.strokeStyle = style || '#fff';
      this.ctx.moveTo(...start);
      this.ctx.lineTo(...end);
      this.ctx.stroke(); //绘制路径。
    },
    getText(timestamp){
      let m = moment(timestamp);
      let hour = m.hour();
      let minute = m.minute();
      if([0, 24].includes(hour) && minute === 0){
        return m.format('YYYY-MM-DD');
      }else if(minute === 30){
        return hour + ':' + minute;
      }else{
        return hour + '';
      }
    },
    drawText(text, position, style, baseline = 'top'){
      this.ctx.font = '12px sans-serif';
      this.ctx.fillStyle = style || '#fff';
      this.ctx.textBaseline = baseline;
      this.ctx.fillText(text, ...position);
    },
    mousedown(e){
      cancelAnimationFrame(this.inertiaTimer);
      cancelAnimationFrame(this.inertiaTargetTimer);
      this.mousedownPoint = [e.offsetX, e.offsetY];
      this.moveAmount = 0;
      this.isDragging = true;
    },
    mousemove(e){
      if(this.isDragging){
        return;
      }

      let offsetX = e.offsetX;
      this.draw();
      let t = this.beginTimestamp + offsetX * this.unitPxMS;
      let text = moment(t).format('HH:mm:ss');

      this.drawText(text, [this.getTextOffset(offsetX, text.length), SCALE_BEGIN_Y], null, 'bottom');
      let x = offsetX;
      this.drawLine([x, SCALE_BEGIN_Y - 5], [x, SCALE_END_Y + 5], '#0fb8ed');
    },
    documentMousemove(e){
      if(this.isDragging){
        if(e.movementX * this.moveAmount >= 0){
          if(Math.abs(e.movementX) > Math.abs(this.moveAmount)){
            this.moveAmount = e.movementX;
          }
        }else{
          this.moveAmount = e.movementX;
        }
        this.move(this.currentTimestamp - e.movementX * this.unitPxMS);
      }
    },
    /**
     * 惯性
     */
    inertia(){
      if(this.moveAmount === 0)return;
      const t = 3;
      if(this.moveAmount > 0 && this.moveAmount > t){
        this.moveAmount = this.moveAmount - t;
      }else if(this.moveAmount < 0 && this.moveAmount < -t){
        this.moveAmount = this.moveAmount + t;
      }else{
        this.moveAmount = 0;
      }
      if(this.moveAmount !== 0){
        let result = this.move(this.currentTimestamp - this.moveAmount * this.unitPxMS);
        if(result){
          this.inertiaTimer = requestAnimationFrame(()=>{
            this.inertia();
          });
        }else{
          this.moveAmount = 0;
          this.$emit('change', new Date(this.currentTimestamp), this.max);
        }
      }else{
        this.$emit('change', new Date(this.currentTimestamp), this.max);
      }
    },
    /**
     * 惯性
     */
    inertiaTarget(target){
      let distance = target - this.currentTimestamp;
      let result;
      if(Math.abs(distance) >= 2){
        result = this.move(this.currentTimestamp + distance * 0.3);
      }else{
        result = this.move(target);
      }

      if(result && Math.abs(distance) > 1){
        this.inertiaTargetTimer = requestAnimationFrame(()=>{
          this.inertiaTarget(target);
        });
      }
    },
    mouseup(e){
      if(e.offsetX === this.mousedownPoint[0]){
        this.isDragging = false;
        return;
      }

      setTimeout(()=>{
        this.inertia();
        this.isDragging = false;
      });
    },
    mouseleave(){
      this.draw();
    },
    click(e){
      cancelAnimationFrame(this.inertiaTimer);
      cancelAnimationFrame(this.inertiaTargetTimer);
      if(this.isDragging){
        return;
      }

      let offsetX = e.offsetX;
      this.inertiaTarget(this.beginTimestamp + offsetX * this.unitPxMS);
      this.$emit('change', new Date(this.beginTimestamp + offsetX * this.unitPxMS), this.max);
    },
    prev(){
      cancelAnimationFrame(this.inertiaTimer);
      cancelAnimationFrame(this.inertiaTargetTimer);
      this.inertiaTarget(this.currentTimestamp - HOUR * 2);
      this.$emit('change', new Date(this.currentTimestamp - HOUR * 2), this.max);
    },
    next(){
      cancelAnimationFrame(this.inertiaTimer);
      cancelAnimationFrame(this.inertiaTargetTimer);
      this.inertiaTarget(this.currentTimestamp + HOUR * 2);
      this.$emit('change', new Date(this.currentTimestamp + HOUR * 2), this.max);
    }
  }
};
</script>

<style scoped>

</style>
