import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts


Vue.component('MonitorView', () => import('./views/echarts.vue'))
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
