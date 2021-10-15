<template>
  <div>
    <el-button
      type="primary"
      @click="show"
    >
      显示
    </el-button>
    <zoom-picture-viewer
      v-model="visible"
      :src="pic"
    />
  </div>
</template>

<script>
import ZoomPictureViewer from '@/components/zoom-picture-viewer/zoom-picture-viewer';
import imgURL from '../../images/2.jpg';

export default {
  name: 'ZoomPictureViewerDemo',
  components: { ZoomPictureViewer },
  data(){
    return {
      visible: false,
      pic: null
    };
  },
  methods: {
    show(){
      this.pic = imgURL;
      this.visible = true;
    }
  }
};
</script>
