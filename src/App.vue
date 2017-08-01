<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item>Tuck Shop Manager</el-menu-item>
      <el-menu-item index="/sell">Sell</el-menu-item>
      <el-menu-item index="/stocks">Stocks</el-menu-item>
      <el-menu-item index="/users">Users</el-menu-item>
      <el-menu-item v-if="!isLoggedIn" index="/login" style="float: right;">
        <el-button type="primary">Login</el-button>
      </el-menu-item>
      <el-menu-item v-if="isLoggedIn" index="/login" style="float: right;">
        <el-button type="primary" v-if="isLoggedIn" @click="logout">Logout</el-button>
      </el-menu-item>
    </el-menu>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    logout () {
      this.$notify.warning({
        title: 'Warning',
        message: 'Logged out successfully',
        duration: 3000,
        offset: 50
      })
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  }
}
</script>

<style>
a:enabled {
  text-decoration: none;
  color: #2979ff;
}

a:active {
  text-decoration: none;
  color: white;
}

body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: lightskyblue;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
