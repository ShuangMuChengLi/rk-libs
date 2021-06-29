<template>
  <div class="video-console-wrapper">
    <div class="video-console-inner">
      <div class="video-console-title">
        工具箱
      </div>
      <div
        v-if="!isPlayback"
        class="video-console-panel"
      >
        <div class="video-console-panel-header">
          <div>云控制台</div>
          <div
            class="link"
            @click="control('setPreset')"
          >
            视角保存
          </div>
        </div>
        <div
          class="video-console-panel-body"
        >
          <div
            class="panel"
            :title="panelTitle"
            :class="{cursor: isCursor}"
            @click="panelClick"
            @mousemove="panelHover"
          />
        </div>
        <div class="video-console-panel-footer">
          <div class="btn-wrapper">
            <div
              class="near-btn"
              title="拉远"
              @click="control('zoomout')"
            />
            <div
              class="far-btn"
              title="拉近"
              @click="control('zoomin')"
            />
          </div>
        </div>
      </div>
      <div class="video-console-panel video-console-panel-mini">
        <div class="video-console-panel-header">
          <div>视频回放</div>
        </div>
        <div class="video-console-panel-body">
          <el-date-picker
            v-model="playbackDate"
            type="date"
            size="small"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          />
        </div>
        <div class="video-console-panel-footer">
          <div class="btn-wrapper">
            <el-button
              type="primary"
              @click="playback"
            >
              回放查询
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VideoConsole',
  props: {
    isPlayback: {
      default: false,
      type: Boolean
    },
    channelId: {
      default: '',
      type: String
    },
    videoTitle: {
      default: '',
      type: String
    },
  },
  data(){
    return {
      pickerOptions: {
        disabledDate(time) {
          return (time.getTime() > Date.now()) || (time.getTime() < (Date.now() - 3600 * 1000 * 24 * 30));
        },
      },
      playbackDate: new Date(),
      downloadDate: null,
      areaSet:{
        'top':{
          controlKey: 'up',
          title: '向上',
          area:[
            [46, 0],
            [101, 0],
            [86, 40],
            [61, 40],
          ]
        },
        'top-right':{
          controlKey: 'upright',
          title: '右上',
          area:[
            [101, 0],
            [86, 40],
            [105, 58],
            [140, 44],
          ]
        },
        'right':{
          controlKey: 'right',
          title: '向右',
          area:[
            [105, 58],
            [140, 44],
            [140, 96],
            [105, 85]
          ]
        },
        'bottom-right':{
          controlKey: 'downright',
          title: '右下',
          area:[
            [140, 96],
            [105, 85],
            [90, 100],
            [100, 137]
          ]
        },
        'bottom':{
          controlKey: 'down',
          title: '向下',
          area:[
            [90, 100],
            [100, 137],
            [48, 137],
            [63, 100]
          ]
        },
        'bottom-left':{
          controlKey: 'downleft',
          title: '左下',
          area:[
            [48, 137],
            [63, 100],
            [44, 83],
            [11, 97]
          ]
        },
        'left':{
          controlKey: 'left',
          title: '向左',
          area:[
            [44, 83],
            [11, 97],
            [11, 46],
            [44, 60]
          ]
        },
        'top-left':{
          controlKey: 'upleft',
          title: '左上',
          area:[
            [11, 46],
            [44, 60],
            [60, 41],
            [47, 7],
          ]
        },
        'middle':{
          controlKey: 'reset',
          title: '复位',
          area:[
            [42, 42],
            [100, 42],
            [100, 100],
            [42, 100],
          ],
        }
      },
      areaTitleSet:{

      },
      isCursor: false,
      panelTitle: '',
      downloaded:false
    };
  },
  methods:{
    isInPolygon(checkPoint, polygonPoints) {
      let counter = 0;
      let i;
      let xinters;
      let p1, p2;
      let pointCount = polygonPoints.length;
      p1 = polygonPoints[0];

      for (i = 1; i <= pointCount; i++) {
        p2 = polygonPoints[i % pointCount];
        if ( checkPoint[0] > Math.min(p1[0], p2[0]) && checkPoint[0] <= Math.max(p1[0], p2[0]) ) {
          if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
            if (p1[0] !== p2[0]) {
              xinters = (checkPoint[0] - p1[0]) * (p2[1] - p1[1]) / (p2[0] - p1[0]) + p1[1];
              if (p1[1] === p2[1] || checkPoint[1] <= xinters) {
                counter++;
              }
            }
          }
        }
        p1 = p2;
      }
      return counter % 2 !== 0;
    },
    getInPolygonKey(e){
      let current;
      for(let key in this.areaSet){
        let result = this.isInPolygon([e.offsetX, e.offsetY], this.areaSet[key].area);
        if(result){
          current = key;
          break;
        }
      }
      return current;
    },
    panelClick(e){
      let current = this.getInPolygonKey(e);
      if(current){
        this.control(this.areaSet[current].controlKey);
      }
    },
    control(key){
      this.$emit('control', key);
    },
    panelHover(e){
      let current = this.getInPolygonKey(e);
      this.isCursor = !!current;
      if(current){
        this.panelTitle = this.areaSet[current].title;
      }
    },
    playback(){
      if(!this.playbackDate){
        this.$message.error('请选择时间');
        return;
      }

      let target = new Date(this.playbackDate);
      let now = new Date();
      if(target.setHours(0, 0, 0, 0) !== now.setHours(0, 0, 0, 0)){
        target.setHours(12, 0, 0, 0);
      }

      this.$emit('playback', target);
    },
  }
};
</script>

<style scoped lang="less">
  @import "video-console";
</style>
