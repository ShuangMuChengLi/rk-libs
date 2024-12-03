<template>
  <div class="demo-wrapper">
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        label-width="180px"
      >
        <el-form-item label="类型">
          <el-radio-group v-model="type">
            <el-radio label="url" />
            <el-radio label="实时播放" />
            <el-radio label="录像" />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="['实时播放', '录像'].includes(type)"
          label="channelCode"
        >
          <el-input
            v-model="form.channelCode"
            clearable
          />
        </el-form-item>
        <el-form-item
          v-if="type === 'url'"
          label="url"
        >
          <el-input
            v-model="form.url"
            clearable
          />
        </el-form-item>
        <el-form-item
          v-if="type === '录像'"
          label="开始时间"
        >
          <el-date-picker
            v-model="form.startDate"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit"
          >
            播放
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="video-wrapper">
      <rk-srs
        :channel-code="submitedInfo.channelCode"
        :url="submitedInfo.url"
        :is-replay="type === '录像'"
        :replay-info="submitedInfo.replayInfo"
      />
    </div>
  </div>
</template>

<script>
import { video } from './video';
import RkSrs from './RkSrs.vue';
import _ from 'lodash';
import moment from 'moment';
export default {
  components: { RkSrs },
  data(){
    return {
      form: {
        channelCode: '200020241106145340000217327V00000000',
        url: 'http://172.17.178.246:1985/live/1017332092256599_MDS0024.sdp.flv',
        startDate: moment().startOf('day').toDate()
      },
      submitedInfo: {
        channelCode: '',
        url: '',
        replayInfo: null
      },
      type: 'url',
    };
  },
  methods:{
    async submit(){
      if(this.type === 'url'){
        this.submitedInfo = {url: this.form.url};
        return;
      }

      if(this.type === '实时播放'){
        this.submitedInfo = {channelCode: this.form.channelCode};
        return;
      }

      if(this.type === '录像'){
        let timeInfo = await this.getReplayTimeInfo(this.form.channelCode);
        if(!timeInfo)return;

        let replayInfo = {
          storeType: timeInfo.storeType,
          timeCell: timeInfo.timeCell,
          startTime: _.first(timeInfo.timeCell).startTime,
          endTime: _.last(timeInfo.timeCell).endTime,
        };
        this.submitedInfo = {
          channelCode: this.form.channelCode,
          replayInfo
        };
        return;
      }
    },
    async getReplayTimeInfo(channelCode){
      let queryTimelineInfo = await video
        .queryPlayback({
          channelCode: channelCode,
          startTime: moment(this.form.startDate).unix(),
          endTime: moment(this.form.startDate).endOf('day').unix(),
          recordType: 0,
        });
      if (!queryTimelineInfo) {
        // this.$message.error('未查到回放信息');
        return;
      }

      let storeType = queryTimelineInfo.storeType;
      let timeCell = queryTimelineInfo.timeList.map((item) => {
        return {
          startTime: moment.unix(item[0]).toDate(),
          endTime: moment.unix(item[1]).toDate(),
        };
      });
      return {
        storeType,
        timeCell,
      };
    },
  }
};
</script>

<style lang="less" scoped>
.video-wrapper{
  width: 600px;
  height: 400px;
}
.form{
  width: 500px;
}
</style>
