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

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var cart = JSON.parse(localStorage.getItem('cart')) || [];
const store = new Vuex.Store({
  state:{
    cart:cart
  },
  mutations:{
    addCart(state,cartInfo) {
      var flag = false;
      state.cart.some(item => {
        if (item.id === cartInfo.id) {
          item.count += cartInfo.count;
          flag=true;
          return true;
        }
      })
      if (!flag) {
        state.cart.push(cartInfo);
      }
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    removeCart(state,id) {
      state.cart.some((item,index) => {
        if (item.id == id) {
          state.cart.splice(index,1);
          return true;
        }
      });
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    selectedChanged(state,info) {
      state.cart.forEach(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
        }
      });
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    updateCount(state,info) {
      state.cart.some(item => {
        if (item.id == info.id) {
          item.count = info.count;
          return true;
        }
      });
      localStorage.setItem('cart',JSON.stringify(state.cart))
    }
  },
  getters:{
    amount(state) {
      var c = 0;
      state.cart.forEach(item => {
          c += item.count
      })
      return c
    },
    selfCount(state) {
      var o = {};
      state.cart.forEach(item => {
        o[item.id] = item.count
      });
      return o;
    },
    quantity(state) {
      var o = {};
      state.cart.forEach(item => {
        o[item.id] = item.max
      });
      return o;
    },
    selected(state) {
      var o = {};
      state.cart.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    totalPrice(state) {
      var o = {
        count:0,
        total:0
      };
      state.cart.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.total += item.price * item.count;
        }
      });
      return o;
    }
    
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
