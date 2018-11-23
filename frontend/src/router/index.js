import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Main from '@/components/Main'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import SignUp from '@/components/SignUp'
import Stock from '@/components/Stock'
import Money from '@/components/Money'
import Detail from '@/components/Detail'

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
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/stock',
      name: 'Stock',
      component: Stock,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/money',
      name: 'Money',
      component: Money,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail/:company',
      name: 'Detail',
      component: Detail,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router
