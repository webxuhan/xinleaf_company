// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
axios.defaults.withCredentials = true
// axios.defaults.headers.common['Authorization'] = 'jameschun';
Vue.prototype.$http = axios

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 富文本编辑器
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
  router,
  store
}).$mount('#app');
