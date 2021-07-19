// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import "babel-polyfill"
import promise from 'es6-promise'
promise.polyfill();
import Vue from 'vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import 'echarts/lib/component/tooltip'
import App from './App'
import axios from 'axios'
import md5 from 'js-md5';

// import 'es6-promise/auto'
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
