// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// import {a} from './components/Test.vue'
// console.log(a);
Vue.use(VueResource)
Vue.http.options.root = 'http://027xin.com:8899'

// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入mui
import './assets/mui/css/mui.min.css'
import './assets/mui/css/icons-extra.css'

// 引入moment
import moment from 'moment'
Vue.filter('dateFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

// 引入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
