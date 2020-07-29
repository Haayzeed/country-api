import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'
// import { BootstrapVue } from 'bootstrap-vue' 
import '../node_modules/jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
    component: viewCountry
    //   children: [{
    //   path: ':id',
    //   name: 'viewCountry',
    //   component: '',
    // }]
  }
]

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

Vue.config.productionTip = false;

Vue.filter('lowercase', function(value){
  return value.toLowerCase();
});

Vue.filter('snippet', function(value){
  return value.slice(0,100) + '...';
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
