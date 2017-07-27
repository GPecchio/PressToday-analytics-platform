<template>
  <div class="admin">
    <h1>{{ title }}</h1>
    <ul>
      <li><router-link to="/login"><el-button>Login</el-button></router-link></li>
      <li><router-link to="/admin/sell"><el-button>Sell</el-button></router-link></li>
      <li><router-link to="/admin/stocks"><el-button>Stocks</el-button></router-link></li>
      <li><router-link to="/admin/users"><el-button>Users</el-button></router-link></li>
    </ul>
    <h3><router-link to="/">{{ back }}</router-link></h3>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      title: 'admin dashboard',
      back: 'Back to homepage'
    }
  }
}
</script>

<style scoped>
a:enabled{
  text-decoration: none;
  color: #2979ff;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
