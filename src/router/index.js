import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Students from '@/components/Students'
import Sell from '@/components/Sell'
import Admin from '@/components/Admin'
import Stocks from '@/components/Stocks'
import Users from '@/components/Users'
import NotFound from '@/components/NotFound'
import NewSell from '@/components/NewSell'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/students',
      name: 'Students',
      component: Students
    },
    {
      path: '/students/sell',
      name: 'Sell',
      component: Sell
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/admin/sell',
      name: 'Sell',
      component: Sell
    },
    {
      path: '/admin/stocks',
      component: Stocks
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/404',
      name: 'NotFoud',
      component: NotFound
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '*',
      redirect: '/404',
      component: NotFound
    }
  ]
})
