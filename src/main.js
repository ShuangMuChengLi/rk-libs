import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'video.js/dist/video-js.css';
import './css/base.less';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import {axios} from './js/html/axios/axios';
// if(process.env.NODE_ENV === 'development'){
//   require('../api/mock-test');
// }
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(axios);
Vue.use(Viewer);
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.bus = this;
  },
  render: h => h(App)
}).$mount('#app');
