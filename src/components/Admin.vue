<template>
  <div class="admin">
    <h1>{{ title }}</h1>
    <h3><router-link to="/">{{ back }}</router-link></h3>
    <ul>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/admin/sell">Sell</router-link></li>
      <li><router-link to="/admin/stocks">Stocks</router-link></li>
      <li><router-link to="/admin/users">Users</router-link></li>
    </ul>
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
