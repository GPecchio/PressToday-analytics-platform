import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Sell from '@/components/Sell'
import Stocks from '@/components/Stocks'
import Users from '@/components/Users'
import UsersNew from '@/components/UsersCUD/New'
import UsersEdit from '@/components/UsersCUD/Edit'
import UsersDelete from '@/components/UsersCUD/Delete'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Sell
    },
    {
      path: '/stocks',
      component: Stocks
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      children: [
        {
          path: 'edit',
          component: UsersEdit
        },
        {
          path: 'delete',
          component: UsersDelete
        }
      ]
    },
    {
      path: '/404',
      name: 'NotFoud',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404',
      component: NotFound
    }
  ]
})
