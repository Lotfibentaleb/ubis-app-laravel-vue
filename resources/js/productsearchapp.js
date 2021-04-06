// Axios & Echo global
require('./bootstrap');

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Router & Store */
import router from './productsearchrouter'

/* Vue. Main component */
import App from './ProductSearchApp.vue'

//import 'buefy/dist/buefy.css';

Vue.config.productionTip = false

/* Main component */
Vue.component('ProductSearchApp', App)

/* Buefy */
Vue.use(Buefy)

Vue.use(require('vue-moment'));

/* This is main entry point */

new Vue({
  router,
  render: h => h(App),
  mounted() {
    document.documentElement.classList.remove('has-spinner-active')
  }
}).$mount('#app')
