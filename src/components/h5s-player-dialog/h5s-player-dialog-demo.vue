<template>
  <div class="live-video-wrapper-test">
    <h5s-player-dialog
      :visible.sync="liveVideoVisible"
      :channel-code="channelCode"
      :channel-name="channelName"
      :server-info="serverInfo"
    />
  </div>
</template>

<script>
import H5sPlayerDialog from '@/components/h5s-player-dialog/h5s-player-dialog';
export default {
  name: 'H5sPlayerDialogDemo',
  components: { H5sPlayerDialog },
  data(){
    return{
      liveVideoVisible: true,
      channelCode: '50011602001310010263',
      channelName: '16020153东城相府与鞍子街路口1',
      serverInfo: {
        'serverHost': '50.72.110.37:8080',
        'account': 'admin',
        'password': '12345'
      }
    };
  },
};
</script>
