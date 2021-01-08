// Axios & Echo global
require('./bootstrap');

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Router & Store */
import router from './registrationrouter'

/* Vue. Main component */
import App from './RegistrationApp.vue'


Vue.config.productionTip = false

/* Main component */
Vue.component('RegistrationApp', App)

/* Buefy */
Vue.use(Buefy)

/* This is main entry point */

new Vue({
  router,
  render: h => h(App),
  mounted() {
    document.documentElement.classList.remove('has-spinner-active')
  }
}).$mount('#app')
