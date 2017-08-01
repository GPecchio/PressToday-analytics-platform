<template>
  <div>
    <div class="login" v-if="!isLoggedIn">
      <h1>{{ title }} with your school
        <br>credentials</h1>
      <br>
      <el-card class="box-card">
        <el-form ref="" label-width="100px" class="demo-dynamic">
          <el-form-item prop="username" label="Username" type="text">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
          <br>
          <el-form-item label-width="25px">
            <el-button type="primary" @click="login({ username, password })">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="else-login" v-if="isLoggedIn">
      <h1>You are logged in</h1>
      <router-link to="/sell">
        <el-button>
          <h3>Go to Sell page</h3>
        </el-button>
      </router-link>
      <router-link to="/stocks">
        <el-button>
          <h3>Go to Stocks page</h3>
        </el-button>
      </router-link>
      <router-link to="/users">
        <el-button>
          <h3>Go to Users page</h3>
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      title: 'Login',
      password: '',
      username: '',
      api: 'http://localhost:3000/api/users',
      usersApi: [],
      users: [],
      outcome: false,
      admin: false,
      wrongLogin: false
    }
  },
  methods: {
    login () {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].username === this.username && this.users[i].password === this.password) {
          this.outcome = true
          this.admin = false
          if (this.users[i].admin === true) {
            this.admin = true
          }
          break
        } else {
          this.admin = false
          this.outcome = false
        }
      }
      if (this.outcome) {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push('/')
          if (this.admin) {
            this.$store.dispatch('setAdmin', {
            }).then(() => {
              this.$notify.success({
                title: 'Success',
                message: 'You are now logged in as admin',
                duration: 3000,
                offset: 50
              })
            })
          } else {
            this.$notify.success({
              title: 'Success',
              message: 'You are now logged in',
              duration: 3000,
              offset: 50
            })
          }
        })
      } else {
        this.$notify.error({
          title: 'Error',
          message: 'Wrong username or password',
          duration: 3000,
          offset: 50
        })
      }
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  beforeMount () {
    Vue.axios.get('http://localhost:3000/api/users').then(response => {
      this.usersApi = response.data
      for (var i = 0; i < this.usersApi.users.length; i++) {
        this.users[i] = this.usersApi.users[i]
      }
    })
  }
}
</script>

<style scoped>
a:enabled {
  text-decoration: none;
  color: #2979ff;
}

.login {
  margin-left: 36.5%;
  z-index: -1;
  position: absolute;
}

.else-login {
  margin-left: 31.5%;
  z-index: -1;
  position: absolute;
}
</style>
