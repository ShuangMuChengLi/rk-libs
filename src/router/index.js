import Vue from 'vue';
import VueRouter from 'vue-router';
import { testRoutes } from './test-routes';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/order',
    component: ()=>import('../views/order.vue')
  },
  {
    path: '/detail/:type',
    component: ()=>import('../views/Home.vue')
  },
  {
    path: '/index',
    component: ()=>import('../views/Home.vue')
  },
  {
    path: '/demo/tamper-protector',
    component: ()=>import('../js/html/tamper-protector/tamper-protector-demo.vue'),
    date: '2022-01-09'
  },
  {
    path: '/demo/iframe-demo',
    component: ()=>import('../experience/html/code-preview/iframe-demo'),
    date: '2022-01-09'
  },
  {
    path: '/demo/js-pdf-demo',
    component: ()=>import('../experience/js/jsPDF/js-pdf-demo.vue'),
    date: '2023-06-30'
  },
  {
    path: '/demo/purdah-slide',
    component: ()=>import('../components/purdah-slide/purdah-slide-test')
  },
  {
    path: '/demo/remote-img',
    component: ()=>import('../components/remote-img/remote-img-demo.vue')
  },
  {
    path: '/demo/uppercase-lock-listener',
    component: ()=>import('../js/html/uppercase-lock-listener/uppercase-lock-listener-demo.vue')
  },
  {
    path: '/demo/remote-search-input',
    component: ()=>import('../components/remote-search-input/remote-search-input-demo.vue')
  },
  {
    path: '/demo/picture-verify-demo',
    component: ()=>import('../components/picture-verify/picture-verify-demo.vue')
  },
  {
    path: '/demo/zoom-picture-viewer-demo',
    component: ()=>import('../components/zoom-picture-viewer/zoom-picture-viewer-demo.vue')
  },
  {
    path: '/demo/Progress-bar-demo',
    component: ()=>import('../components/progress-bar/Progress-bar-demo')
  },
  {
    path: '/demo/up-load-files-demo',
    component: ()=>import('../components/upLoad-files/up-load-files-demo')
  },
  {
    path: '/demo/watermark-demo',
    component: ()=>import('../js/html/watermark/watermark-demo')
  },
  {
    path: '/demo/three-slide-demo',
    component: ()=>import('../js/html/three-slide/three-slide-demo.vue')
  },
  {
    path: '/demo/h5s-player-dialog-demo',
    component: ()=>import('../components/h5s-player-dialog/h5s-player-dialog-demo')
  },

  {
    path: '/wow-demo',
    component: ()=>import('../experience/special-effects/wow/wow-demo.vue')
  },
  {
    path: '/demo/rk-calendar-demo',
    component: ()=>import('../components/rk-calendar/rk-calendar-demo.vue')
  },
  {
    path: '/demo/arrow-demo',
    component: ()=>import('../components/flow-chart/arrow/arrow-demo.vue')
  },
  {
    path: '/demo/animate',
    component: ()=>import('../experience/special-effects/animate/animate.vue')
  },
  {
    path: '/demo/rk-sm2-demo',
    component: ()=>import('../js/math/rk-sm2/rk-sm2-demo')
  },
  {
    path: '/demo/axios',
    component: ()=>import('../views/test/axios')
  },
  {
    path: '/demo/animate',
    component: ()=>import('../experience/special-effects/animate/animate')
  },
  {
    path: '/demo/recorderjs',
    component: ()=>import('../experience/html/recorderjs/recorder-test')
  },
  {
    path: '/demo/editor',
    component: ()=>import('../experience/html/editor/editor')
  },
  {
    path: '/demo/ol-load-json',
    component: ()=>import('../experience/js/map/json/ol-load-json')
  },
  {
    path: '/demo/map-mixin',
    component: ()=>import('../js/map/map-mixin/map-mixin-demo.vue')
  },
  {
    path: '/experience/solution/excel/excel-demo',
    component: ()=>import('../experience/solution/excel/excel-demo')
  },
  {
    path: '/experience/html/speech/speech-demo',
    component: ()=>import('../experience/html/speech/speech-demo')
  },
  {
    path: '/experience/html/css/css-demo',
    component: ()=>import('../experience/html/css/css-demo')
  },
  {
    path: '/experience/special-effects/PortalBg',
    component: ()=>import('../experience/special-effects/PortalBg/PortalBg')
  },
  {
    path: '/demo/worker-demo',
    component: ()=>import('../views/test/worker-demo/worker-test')
  },
  {
    path: '/demo/capture-pic',
    component: ()=>import('../js/html/capture-pic/capture-pic-demo')
  },
  {
    path: '/components/common-table',
    component: ()=>import('../components/common-table/common-table-demo')
  },
  {
    path: '/components/common-filter',
    component: ()=>import('../components/common-filter/common-filter-demo')
  },
  {
    path: '/components/image-with-error',
    component: ()=>import('../components/image-with-error/image-with-error-demo.vue')
  },
  {
    path: '/components/person-label',
    component: ()=>import('../components/data/person-label/person-label-demo')
  },
  {
    path: '/components/common-dialog',
    component: ()=>import('../components/common-dialog/common-dialog-demo')
  },
  {
    path: '/components/common-form',
    component: ()=>import('../components/common-form/common-form-demo')
  },
  {
    path: '/components/echart/chart-show',
    component: ()=>import('../components/echart/chart-show/ChartShowDemo')
  },
  {
    path: '/components/Zoomer',
    component: ()=>import('../components/Zoomer/ZoomerDemo')
  },
  {
    path: '/components/video-player-plugin',
    component: ()=>import('../components/hikvision-video-player-plugin/video-player-plugin-preview')
  },
  {
    path: '/components/select-more/SelectMoreDemo',
    component: ()=>import('../components/select-more/SelectMoreDemo')
  },
  {
    path: '/components/SelectTree/SelectMoreDemo',
    component: ()=>import('../components/SelectTree/SelectTreeDemo')
  },
  {
    path: '/components/virtual-list/VirtualListDemo',
    component: ()=>import('../components/virtual-list/VirtualListDemo')
  },
  {
    path: '/components/full-screen/FullScreenDemo',
    component: ()=>import('../components/full-screen/FullScreenDemo')
  },
  {
    path: '/demo/font',
    component: ()=>import('../experience/html/font/Font')
  },
  {
    path: '/components/ImageUpload/ImageUploadDemo',
    component: ()=>import('../components/ImageUpload/ImageUploadDemo')
  },
  {
    path: '/components/FileUpload/FileUploadDemo',
    component: ()=>import('../components/FileUpload/FileUploadDemo')
  },
  {
    path: '/demo/dialogDrag',
    component: ()=>import('../components/dialog-drag/DialogDrag')
  },
  {
    path: '/demo/valid',
    component: ()=>import('../js/html/com-valid/valid')
  },
  {
    path: '/tools/export-excel',
    component: ()=>import('../js/tools/export-excel/export-excel-demo')
  },
  {
    path: '/components/com-signWrite/signWrite',
    component: ()=>import('../components/com-signWrite/signWrite')
  },
  {
    path: '/components/com-codeRotate/codeRotate',
    component: ()=>import('../components/com-codeRotate/codeRotate')
  },
  {
    path: '/components/com-codeImg/codeImg',
    component: ()=>import('../components/com-codeImg/codeImg')
  },
  {
    path: '/components/select-drag/select-drag-demo',
    component: ()=>import('../components/select-drag/select-drag-demo')
  },
  {
    path: '/components/rk-ruler/rk-ruler-demo',
    component: ()=>import('../components/rk-ruler/rk-ruler-demo')
  },
  {
    path: '/components/rk-aerial-view/rk-aerial-view-demo',
    component: ()=>import('../components/rk-aerial-view/rk-aerial-view-demo')
  },
  {
    path: '/components/rk-add-file/rk-add-file-demo',
    component: ()=>import('../components/rk-add-file/rk-add-file-demo')
  },
  {
    path: '/demo/video-first-frame-demo',
    component: ()=>import('../js/html/video-first-frame/video-first-frame-demo')
  },
  {
    path: '/demo/audio-duration-demo',
    component: ()=>import('../js/html/audio-duration/audio-duration-demo')
  },
  {
    path: '/components/map-ol/map-ol-show',
    component: ()=>import('../components/map-ol/MapShow')
  },
  {
    path: '/components/router-menu/router-menu-demo',
    component: ()=>import('../components/router-menu/router-menu-demo')
  },
  {
    path: '/components/json-editor/json-editor-demo',
    component: ()=>import('../components/json-editor/json-editor-demo')
  },
  {
    path: '/components/video-js-hls',
    component: ()=>import('../components/video-js-hls/video-js-hls-demo')
  },
  ...testRoutes
];
const ENV = process.env.NODE_ENV;
if(ENV === 'production'){
  routes.push({ path: '/', redirect: '/index' });// 开发环境"/"重定向到路由列表页
}else if (ENV === 'development') {
  routes.push({ path: '/', redirect: '/order' });// 开发环境"/"重定向到路由列表页
}
const router = new VueRouter({
  routes
});

export default router;
