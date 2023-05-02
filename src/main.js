import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueMask from 'v-mask'

axios.defaults.baseURL = 'http://127.0.0.1:5000/' 

Vue.prototype.$http = axios
Vue.prototype.$store = store
Vue.use(VueMask);

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')



