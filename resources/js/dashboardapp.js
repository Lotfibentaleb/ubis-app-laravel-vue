// Axios & Echo global
require('./bootstrap');

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'
import VueApexCharts from 'vue-apexcharts'
import VueCarousel from 'vue-carousel'

/* Router & Store */
import router from './dashboardrouter'

/* Vue. Main component */
import App from './DashboardApp.vue'

//import 'buefy/dist/buefy.css';

Vue.config.productionTip = false

/* Main component */
Vue.component('DashboardApp', App)
Vue.use(VueApexCharts)
Vue.use(VueCarousel)
Vue.component('apexchart', VueApexCharts)
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
