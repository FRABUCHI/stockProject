import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'

import Main from '@/components/Main'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Stock from '@/components/Stock'
import Money from '@/components/Money'
import Detail from '@/components/Detail'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(BootstrapVue)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
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
