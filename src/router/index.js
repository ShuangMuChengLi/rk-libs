import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/detail/:type',
    component: ()=>import('../views/Home.vue')
  },
  {
    path: '/',
    component: ()=>import('../views/Home.vue')
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
    path: '/demo/rk-sm2-demo',
    component: ()=>import('../views/demo/rk-sm2-demo')
  },
  {
    path: '/js-test/map/intersectsCoordinate-test',
    component: ()=>import('../views/js-test/map/intersectsCoordinate-test')
  },
];

const router = new VueRouter({
  routes
});

export default router;
