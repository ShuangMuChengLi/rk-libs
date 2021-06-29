<template>
  <div class="live-video-wrapper-test">
    <h5s-player-dialog
      :visible.sync="liveVideoVisible"
      :channel-code="channelCode"
      :channel-name="channelName"
    />
  </div>
</template>

<script>
/**
 * address: null
 areaCode: "5001160002"
 areaCodeName: "东城所"
 captureTime: null
 channelCode: "50011602001310010263"
 channelName: "16020153东城相府与鞍子街路口1"
 channelStatus: "0"
 channelStatusName: null
 concernType: "1"
 concernTypeName: "党政机关"
 constructionType: "1"
 constructionTypeName: "一类监控点"
 createDeviceTime: null
 deviceAttributionId: "50011600"
 deviceAttributionName: null
 deviceName: "16020153东城相府与鞍子街路口1"
 deviceStatus: null
 deviceType: 5
 deviceTypeName: "普通监控"
 functionType: null
 functionTypeName: null
 gbId: "50011602001310010263"
 height: 207
 id: "2600121032500783604"
 imageUrl: null
 ipAddress: null
 isOpen: true
 latitude: 29.290391
 locationType: null
 locationTypeName: null
 longitude: 106.254572
 model: null
 monitorType: "1"
 monitorTypeName: "一类监控点"
 password: null
 port: null
 recordVersion: 533
 userName: null
 */
import H5sPlayerDialog from '@/components/h5s-player-dialog/h5s-player-dialog';
export default {
  name: 'H5sPlayerDialogDemo',
  components: { H5sPlayerDialog },
  data(){
    return{
      liveVideoVisible: true,
      channelCode: '50011602001310010263',
      channelName: '16020153东城相府与鞍子街路口1'
    };
  },
};
</script>

<style scoped>
  .live-video-wrapper-test{
    width: 100vw;
    height: 100vh;
  }
</style>
