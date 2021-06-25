import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import JsonViewer from 'vue-json-viewer'
import VueCookies from 'vue-cookies'
import VueInfiniteScroll from 'vue-infinite-scroll';
Vue.use(VueCookies) 
Vue.use(Antd)
Vue.use(JsonViewer)
Vue.use(VueInfiniteScroll)
Vue.$cookies.config('7d')
Vue.config.productionTip = false
const http = axios.create({
  baseURL: 'http://localhost:3000'
})
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (Vue.$cookies.get('token')) {
    config.headers.Authorization = 'bearer ' + Vue.$cookies.get('token')
  }
  return config;
}, function (error) {33333
  // Do something with request error
  return Promise.reject(error);
})
Vue.prototype.$http=http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
