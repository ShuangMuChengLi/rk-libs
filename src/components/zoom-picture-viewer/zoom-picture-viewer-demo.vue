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
      this.pic = 'https://hbfile.huabanimg.com/img/home/banner/1a6ad3b820b1246aa6340a1a64546c58a735fc8520679e';
      this.visible = true;
    }
  }
};
</script>
