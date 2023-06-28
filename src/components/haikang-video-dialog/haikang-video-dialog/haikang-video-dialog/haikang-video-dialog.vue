<template>
  <common-dialog
    :visible="visible"
    :title="title"
    :is-favorites.sync="isFavorites"
    :is-show-favorites-icon="true"
    :is-center="!isFullScreen"
    @close="close"
    @setFavorites="setFavorites"
  >
    <div
      class="live-video-wrapper test"
      :class="{'only-video': onlyVideo}"
    >
      <div
        class="show-video-bar"
      >
        <template
          v-if="gbId"
        >
          <video-haikang
            :gb-id="gbId"
            :is-full-screen.sync="isFullScreen"
          />
        </template>
        <div
          v-if="!gbId"
          class="empty-video"
        >
          <div class="no-data" />
          暂无视频连接
        </div>
      </div>
      <div class="photo-list">
        <div
          v-for="(item, key) in photoList"
          :key="key"
          class="photo-list-row"
        >
          <el-image
            class="common-img"
            :src="item.scenePhotoUrl"
            fit="contain"
            @error="pictureError(item)"
            @click="showFullScreen(item, key)"
          />
          <p class="photo-title">
            {{ item.captureTime }}
          </p>
        </div>
        <div
          v-for="(key) in setEmptyDivNumber"
          :key="key + 'setEmptyDivNumber'"
          class="empty-bar"
        />
        <div
          v-if="isShowMore"
          class="show-more-btn"
          @click="goMore"
        >
          查找更多
        </div>
      </div>
      <div class="btn-wrapper">
        <div
          v-if="false"
          class="full-screen-icon"
          title="全屏"
          @click="fullScreenVideo"
        />
      </div>
    </div>
  </common-dialog>
</template>
<script>
import CommonDialog from '../common-dialog/common-dialog';
import errorImg from '../pubilc-image/no-picture-dark.png';
import {axios} from '../../../js/tools/axios';
import {api, JSONHeader} from '../../../../config/api-config';
import { util } from '../../../js/tools/util';
import _ from 'lodash';
import setIsFavorites from '../set-is-favorites';
import moment from 'moment';
import { setCaptureListTime } from '@/components/dialog/live-video-v2/set-special-data';
import VideoHaikang from './video-haikang/video-haikang';
export default {
  name: 'HaikangVideoDialog',
  components: {VideoHaikang, CommonDialog},
  mixins:[
    setIsFavorites
  ],
  props:{
    visible:{
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    },
  },
  data(){
    return{
      errorImg,
      photoList:[],
      channelCode: null,
      isFullScreen: false,
      gbId: null,
      title: '',
      deviceType: '',
      onlyVideo: true,
      favoriteType: '5',
      deviceInfo: null,
      isShowSelectTime: false, // 是否展示选择时间框
      pickerOptions: {
        disabledDate(time){
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          const duration = moment(Date.now()).diff(
            moment(time.getTime()),
            'days');
          return duration > 90 || time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: null,
      playBackRange: null,
      progressBarVisible: false,
      isPlayback: false,
      progressBarDate: null,
      lastCtrlType: '', //当前的控制的类别
      delay: 0, //延时
      throttleTimer: null,
      stopCtrlTimer: null,
      conditionTime: null,
      consoleVisible: true,
      loadedImgIndex: 0,
      videoConfig: null, // 视频播放配置信息
      channelInfo: null, // 通道信息
      streamDetail: null, // 视频预览信息
      keepAliveTimer: null, // 视频流保活时间标识ID
    };
  },
  computed:{
    setEmptyDivNumber(){
      if(this.photoList.length >= 7) return 0;

      return 7 - this.photoList.length % 7;
    },
    isShowMore(){
      // return false;
      return this.photoList.length >= 7;
    }
  },
  watch:{
    data:{
      handler(val){
        // if(val){
        //   return;
        // }

        this.init();
      },
      immediate: false
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    async init(){
      let gbId = this.data?.data?.gbId || this.data?.data?.recorder;
      if(!gbId){
        if(!this.data?.data?.id) return this.$message.error('设备信息获取异常:无ID');

        this.deviceInfo = await this.getDetailById(this.data?.data?.id);
        if(!this.deviceInfo) return this.$message.error('设备信息获取异常');

        this.bus.$emit('map-set:setCenter', [this.deviceInfo.longitude, this.deviceInfo.latitude], true);
      }else{
        this.deviceInfo = this.data?.data;
      }
      if(!this.deviceInfo) return this.$message.error('设备信息获取异常');

      this.gbId = gbId; //this.gbId = this.data?.data?.gbId;
      let status;
      if(this.deviceInfo.channelStatus + '' === '0'){
        status = '（在线）';
      }else{
        status = '（离线）';
      }
      this.title = _.get(this.deviceInfo, 'deviceName', '');
      this.channelInfo = { title: this.title };
      this.deviceType = this.deviceInfo.deviceType;
      if(this.deviceType + '' === '2'){
        // 人脸
        this.getCapturePageList(api.collect.getFaceCapturePageList);
      }

      if(this.deviceType + '' === '1'){
        // 车辆
        this.getCapturePageList(api.collect.getVehicleCapturePageList);
      }

      if(this.deviceType + '' === '8'){
        // 门禁
        this.getCapturePageList(api.collect.getDoorCapturePageList);
      }

      this.isFavorite({
        sourceId: this.deviceInfo.id,
        favoriteType: '5'
      });

      console.log(this.gbId);
      if (this.data?.data?.isShowPoint) {
        this.bus.$emit('map-set:showPoints', {
          list: [this.deviceInfo],
          type: 'live-video-single',
          iconType: 'actual-device',
          isCluster: false,
          titleKey: 'buildingInfo',
          isSole: true
        });
      }
    },
    goMore(){
      let deviceType;
      if(this.deviceType + '' === '1'){
        deviceType = 'car_device';
      }

      if(this.deviceType + '' === '2'){
        deviceType = 'person_device';
      }

      if(this.deviceType + '' === '8'){
        deviceType = 'door_device';
      }
      util.goto('/manager/capture-records/' + this.gbId + '/' + deviceType); //国标id跟设备参数类型
    },
    close(){
      this.$emit('update:visible', false);
      this.$emit('close');
      this.clearPoint();
    },
    pictureError(item){
      item.isErrorImg = true;
      item.scenePhotoUrl = errorImg;
    },
    loadImg(list){
      this.photoList.push(list[this.loadedImgIndex]);
      if(this.loadedImgIndex < 6){
        setTimeout(()=>{
          this.loadedImgIndex ++;
          this.loadImg(list);
        }, 500);
      }
    },
    /**
     * 获取抓拍数据
     */
    async getCapturePageList(apiName){
      if(!this.gbId || !apiName) return;

      let params = {
        gbId: this.gbId,
        pageId: 1,
        pageSize: 7,
      };
      let result = await axios.post(apiName, params, JSONHeader)
        .then(res=>{
          let result = util.verifyResult(res);
          if (!result) {
            this.$message.error(res.data.message);
            return false;
          }

          for(let item of result.rows){
            item.facePhotoUrl = util.getDefinedPicSrc(item.facePhotoUrl);
            item.scenePhotoUrl = util.getDefinedPicSrc(item.scenePhotoUrl);
          }
          let list = result.rows.slice(0, 7);
          // 设置晶彩城2栋正门
          if (this.gbId === '50011612011345000014') {
            list = setCaptureListTime(list);
          }
          this.loadImg(list);
          return list;
        })
        .catch(error => {
          console.error(error);
          return false;
        });
      this.onlyVideo = !(result && result.length > 0);
    },
    showFullScreen(item, index) {
      if(item.isErrorImg) return;

      let picItem = {
        picList: this.photoList,
        pictureIndex: index,
        urlKey: 'scenePhotoUrl',
        isChangePic: false
      };
      this.bus.$emit('viewPicture', picItem);
      // this.bus.$emit('setUrl', item.scenePhotoUrl);
    },
    /**
     * @20200912
     * 获取拼接图片
     * @param url
     */
    getUtilPicUrl(url){
      return util.getDefinedPicSrc(url);
    },
    /**
     *
     *
     */
    async getDetailById(id){
      let result = await axios.get(api.deviceInfo.getDetailById, {
        id: id
      }).then((res)=>{
        return util.verifyResult(res);
      }).catch((err)=>{
        console.error(err);
        return false;
      });

      if(!result) return false;

      return result;
    },
    clearPoint(){
      if(!this.data?.data?.isShowPoint) return;
      this.bus.$emit('map-set:clearPointsByType', 'live-video-single');
    },
    fullScreenVideo(){
      this.isFullScreen = !this.isFullScreen;
    },
  }
};
</script>

<style scoped lang="less">
@import "../haikang-video-dialog/haikang-video-dialog";
</style>
