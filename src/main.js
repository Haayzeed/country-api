import Vue from 'vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'
import '../node_modules/jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/style.css'
import App from './App.vue'

// import { BootstrapVue } from 'bootstrap-vue' 


import index from './components/index.vue'
import viewCountry from './components/viewCountry.vue'

// Vue.use(BootstrapVue)
Vue.use(VueResource);
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/viewCountry/:alpha3Code',
    name: 'viewCountry',
    component: viewCountry,
    },
    {
      path: '/viewCountry',
      redirect: '/'
    }
]

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
