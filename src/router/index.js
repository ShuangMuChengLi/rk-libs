import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
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
    path: '/js-test/map/intersectsCoordinate-test',
    component: ()=>import('../views/js-test/map/intersectsCoordinate-test')
  },
];

const router = new VueRouter({
  routes
});

export default router;
