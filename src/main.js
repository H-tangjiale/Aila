// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import store from './store'
import './assets/css/reset.css'

import common from './components/common';
for (var i in common) {
  Vue.component(i, common[i])
}

Vue.prototype.axios = axios;

Vue.config.productionTip = false

axios.interceptors.response.use(config=>{
  if(config.data.code==-1){
    router.replace('/login')
    return
  }
  return config
})
axios.interceptors.request.use(config=>{
  console.log(config);
  return config
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return;
  }

  if (to.path.includes('index')) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('username') != 'admin') {
      next();
    } else if (sessionStorage.getItem('username') == 'admin') {
      next();
    } else {
      next('/login')
    }
    return;
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
