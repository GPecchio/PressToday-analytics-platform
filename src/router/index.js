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
      name: 'Admin',
      component: Admin
    },
    {
      path: '/admin/sell',
      name: 'Sell',
      component: Sell
    },
    {
      path: '/admin/stocks',
      name: 'Stocks',
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
      path: '/stocks',
      name: 'Stocks',
      component: Stocks
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
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
