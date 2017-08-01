import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ADMIN_SUCCESS = 'ADMIN_SUCCESS'
const LOGOUT = 'LOGOUT'

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    isAdmin: !!localStorage.getItem('token2')
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [ADMIN_SUCCESS] (state) {
      state.isAdmin = true
    },
    [LOGOUT] (state) {
      state.isAdmin = false
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({
      commit
    }, creds) {
      commit(LOGIN)
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout ({
      commit
    }) {
      localStorage.removeItem('token')
      localStorage.removeItem('token2')
      commit(LOGOUT)
    },
    setAdmin ({
      commit
    }, creds) {
      commit(LOGIN)
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token2', 'JWT')
          commit(ADMIN_SUCCESS)
          resolve()
        }, 1000)
      })
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    isAdmin: state => {
      return state.isAdmin
    }
  }
})
