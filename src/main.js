import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../src/assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL=''//'http://localhost:8081/'  //'https://v1.alapi.cn/api/'
Vue.prototype.$http = axios



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
