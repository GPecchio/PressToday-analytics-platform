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

Vue.use(Router)

export var router = new Router()

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
      component: Students,
      children: [
        {path: '', component: Sell}
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {path: '', component: Admin},
        {path: 'sell', name: 'sell', component: Sell},
        {path: 'stocks', name: 'stocks', component: Stocks},
        {path: 'users', name: 'users', component: Users}
      ]
    },
    {
      path: '/404',
      name: 'NotFoud',
      component: NotFound
    },
    // catch all redirect
    {
      path: '*',
      redirect: '/404',
      component: NotFound
    }
  ]
})

/*
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
}) */
