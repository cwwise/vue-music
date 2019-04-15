import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

import '@/common/stylus/index.styl'

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./common/image/default.png'),
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
