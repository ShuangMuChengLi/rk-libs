export const testRoutes = [
  {
    path: '/js-test/map/intersectsCoordinate-test',
    component: ()=>import('../views/js-test/map/intersectsCoordinate-test')
  },
  {
    path: '/test/ol-demo',
    component: ()=>import('../views/demo/ol-demo.vue')
  },
  {
    path: '/test/ol-load-img-demo',
    component: ()=>import('../views/demo/ol-load-img-demo.vue')
  },
  {
    path: '/vue-test',
    component: ()=>import('../views/demo/vue-test')
  },
  {
    path: '/canvas-test',
    component: ()=>import('../views/demo/canvas-test/canvas-test')
  },
  {
    path: '/photo-uploader-demo',
    component: ()=>import('../components/photo-uploader/photo-uploader-demo')
  },
];
