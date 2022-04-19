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
    path: '/experience/html/speech/speech-demo',
    component: ()=>import('../experience/html/speech/speech-demo')
  },
  {
    path: '/experience/html/css/css-demo',
    component: ()=>import('../experience/html/css/css-demo')
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
    path: '/components/image-width-error',
    component: ()=>import('../components/image-width-error/image-width-error-demo.vue')
  },
  {
    path: '/components/person-label',
    component: ()=>import('../components/data/person-label/person-label-demo')
  },
  {
    path: '/components/other/common-dialog',
    component: ()=>import('../components/other/common-dialog/common-dialog-demo')
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
