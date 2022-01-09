import Vue from 'vue';
import VueRouter from 'vue-router';

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
    component: ()=>import('../experience/html/iframe/iframe-demo'),
    date: '2022-01-09'
  },
  {
    path: '/demo/ol-demo',
    component: ()=>import('../views/demo/ol-demo.vue')
  },
  {
    path: '/demo/ol-load-img-demo',
    component: ()=>import('../views/demo/ol-load-img-demo.vue')
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
    component: ()=>import('../views/demo/picture-verify-demo.vue')
  },
  {
    path: '/demo/zoom-picture-viewer-demo',
    component: ()=>import('../views/demo/zoom-picture-viewer-demo.vue')
  },
  {
    path: '/demo/Progress-bar-demo',
    component: ()=>import('../views/demo/Progress-bar-demo')
  },
  {
    path: '/demo/up-load-files-demo',
    component: ()=>import('../views/demo/up-load-files-demo')
  },
  {
    path: '/demo/watermark-demo',
    component: ()=>import('../views/demo/watermark-demo')
  },
  {
    path: '/demo/three-slide-demo',
    component: ()=>import('../views/demo/three-slide-demo.vue')
  },
  {
    path: '/demo/h5s-player-dialog-demo',
    component: ()=>import('../views/demo/h5s-player-dialog-demo')
  },
  {
    path: '/vue-test',
    component: ()=>import('../views/demo/vue-test')
  },
  {
    path: '/wow-demo',
    component: ()=>import('../views/demo/wow-demo.vue')
  },
  {
    path: '/demo/rk-calendar-demo',
    component: ()=>import('../views/demo/rk-calendar-demo.vue')
  },
  {
    path: '/demo/arrow-demo',
    component: ()=>import('../views/demo/arrow-demo.vue')
  },
  {
    path: '/demo/animate',
    component: ()=>import('../views/demo/animate.vue')
  },
  {
    path: '/demo/rk-sm2-demo',
    component: ()=>import('../views/demo/rk-sm2-demo')
  },
  {
    path: '/demo/axios',
    component: ()=>import('../views/demo/axios')
  },
  {
    path: '/demo/animate',
    component: ()=>import('../views/demo/animate')
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
    path: '/experience/html/speech/speech-demo',
    component: ()=>import('../experience/html/speech/speech-demo')
  },
  {
    path: '/demo/worker-demo',
    component: ()=>import('../views/demo/worker-demo/worker-test')
  },
  {
    path: '/demo/capture-pic',
    component: ()=>import('../js/html/capture-pic/capture-pic-demo')
  },
  {
    path: '/js-test/map/intersectsCoordinate-test',
    component: ()=>import('../views/js-test/map/intersectsCoordinate-test')
  },
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
