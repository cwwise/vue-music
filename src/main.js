import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

import '@/common/stylus/index.styl'

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
