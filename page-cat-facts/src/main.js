import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router';
import VuePaginate from 'vue-paginate';
import routes from './routes.js';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VuePaginate);
Vue.use(vueRouter);

const router = new vueRouter({
  mode: 'history',
  base: __dirname,
  routes // short for `routes: routes`
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
