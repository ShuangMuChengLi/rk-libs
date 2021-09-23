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
    path: '/demo/picture-verify-demo',
    component: ()=>import('../views/demo/picture-verify-demo.vue')
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
