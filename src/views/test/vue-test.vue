<template>
  <div class="wrapper">
    <div class="out">
      <div class="card">
        本来面目
      </div>
    </div>
  </div>
</template>

<script>
import {lib} from './lib';

export default {
  name: 'VideoExample',
  async mounted() {
    lib.alert();
    local_ip();
    function local_ip(){
      var $mytimeout;
      if ( window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection ){
        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var $pc = new RTCPeerConnection({iceServers:[]}),
          $noop = function(){};
        $pc.createDataChannel('');
        $pc.createOffer($pc.setLocalDescription.bind($pc), $noop);
        $pc.onicecandidate = function($ice){
          console.log($ice.currentTarget.localDescription.sdp);
          console.log($ice.currentTarget.pendingLocalDescription.sdp);
        };
      }
      else{
        document.getElementById('list').innerHTML = '-';
      }
    }
  }
};
</script>
<style scoped lang="less">
.out{
  border: 1px dashed #333;
  width: 100px;
  height: 100px;
  position: relative;
  .card{
    position: absolute;
    transform: matrix(1, 0, 0, 1, 100, 0);
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ff8c66;
  }
}

</style>
