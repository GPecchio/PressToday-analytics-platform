<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><router-link to="/">Tuck Shop Manager</router-link></el-menu-item>  
      <el-submenu index="2">
        <template slot="title">Students</template>
        <el-menu-item index="2-1"><router-link to="/students/">Dashboard</router-link></el-menu-item>
        <el-menu-item index="2-2"><router-link to="/students/sell">Sell</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">Admin</template>
        <el-menu-item index="3-1"><router-link to="/admin/">Dahsboard</router-link></el-menu-item>
        <el-menu-item index="3-2"><router-link to="/admin/sell">Sell</router-link></el-menu-item>
        <el-menu-item index="3-3"><router-link to="/admin/stocks">Stocks</router-link></el-menu-item>
        <el-menu-item index="3-4"><router-link to="/admin/users">Users</router-link></el-menu-item>
      </el-submenu>
      <el-menu-item index="4"><router-link to="/login">Login</router-link></el-menu-item>
    </el-menu>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
a:enabled{
  text-decoration: none;
  color: #2979ff;
}

body {
  margin: 0;
}

#app {
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
