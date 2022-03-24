export const testRoutes = [
  {
    path: '/js-test/map/intersectsCoordinate-test',
    component: ()=>import('../js/map/intersectsCoordinate/intersectsCoordinate-test')
  },
  {
    path: '/test/ol-demo',
    component: ()=>import('../views/test/ol-demo.vue')
  },
  {
    path: '/test/ol-load-img-demo',
    component: ()=>import('../views/test/ol-load-img-demo.vue')
  },
  {
    path: '/vue-test',
    component: ()=>import('../views/test/vue-test')
  },
  {
    path: '/canvas-test',
    component: ()=>import('../views/test/canvas-test/canvas-test')
  },
  {
    path: '/photo-uploader-demo',
    component: ()=>import('../components/photo-uploader/photo-uploader-demo')
  },
  {
    path: '/snap-test',
    component: ()=>import('../experience/js/Snap/snap-test')
  },
  {
    path: '/leaflet',
    component: ()=>import('../experience/js/map/leaflet/leaflet')
  },
];
