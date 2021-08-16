<template>
  <canvas
    :id="id"
    :width="width"
    :height="height"
  />
</template>

<script>
export default {
  name: 'Arrow',
  props: {
    width: {
      default: 500,
      type: Number
    },
    height: {
      default: 500,
      type: Number
    },
    path: {
      default: null,
      type: Array
    },
    color: {
      default: '#000',
      type: String
    },
  },
  data(){
    return {
      canvas: null,
      ctx: null,
      id: null
    };
  },
  watch:{
    path:{
      handler(val){
        if(Array.isArray(val)){
          this.drawArrow({
            ctx: this.ctx,
            path: this.path
          });
        }
      },
      immediate: false
    }
  },
  mounted () {
    this.init();
  },
  methods:{
    init(){
      this.id = Math.random().toString();
      this.$nextTick(()=>{
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');

        if (!Array.isArray(this.path)){
          return;
        }

        this.drawArrow({
          ctx: this.ctx,
          path: this.path,
          color: this.color
        });
      });
    },
    drawArrow({ path, ctx, width = 1, color = '#000' }) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      this.drawArrowLine(ctx, path);
      this.drawArrowhead(ctx, ...path[path.length - 2], ...path[path.length - 1]);
    },
    drawArrowLine(ctx, path){
      ctx.beginPath();

      ctx.moveTo(...path[0]);
      for (let i = 1; i < path.length - 1; i++){
        const item = path[i];
        ctx.lineTo(...item);
      }
      ctx.stroke();
    },
    drawArrowhead(ctx, fromX, fromY, toX, toY, theta = 30, headlen = 10,) {
      // 计算各角度和对应的P2,P3坐标
      var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI;
      var angle1 = (angle + theta) * Math.PI / 180;
      var angle2 = (angle - theta) * Math.PI / 180;
      var topX = headlen * Math.cos(angle1);
      var topY = headlen * Math.sin(angle1);
      var botX = headlen * Math.cos(angle2);
      var botY = headlen * Math.sin(angle2);

      ctx.save();
      ctx.beginPath();

      var arrowX = fromX - topX;
      var arrowY = fromY - topY;

      ctx.moveTo(arrowX, arrowY);
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      arrowX = toX + topX;
      arrowY = toY + topY;
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(toX, toY);
      arrowX = toX + botX;
      arrowY = toY + botY;
      ctx.lineTo(arrowX, arrowY);
      ctx.stroke();
      ctx.restore();
    }
  }
};
</script>
