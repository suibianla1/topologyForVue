// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import VueDragResize from 'vue-drag-resize'
import ele from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'
import store from './store/index'
import { canvas2svg } from '../static/js/canvas2svg'
import axios from './utils/axios'

Vue.use(vuex)
Vue.use(VueDragResize)
Vue.use(ele, {locale})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.canvas2svg = canvas2svg()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
