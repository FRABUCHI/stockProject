import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'
// import getters from './getters'
// import actions from './actions'
// import mutations from './mutations'

import Main from '@/components/Main'
import Stock from '@/components/Stock'
import Money from '@/components/Money'
import Detail from '@/components/Detail'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(BootstrapVue)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/stock',
      name: 'Stock',
      component: Stock
    },
    {
      path: '/money',
      name: 'Money',
      component: Money
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})

export default router
