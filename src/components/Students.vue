<template>
  <div class="students">
    <h1>{{ title }}</h1>
    <ul>
      <li><el-button><router-link to="/login">Login</router-link></el-button></li>
      <li><el-button><router-link to="/students/sell">Sell</router-link></el-button></li>
    </ul>
    <h3><router-link to="/">{{ back }}</router-link></h3>
  </div>
</template>

<script>
export default {
  name: 'students',
  data () {
    return {
      title: 'student dashboard',
      back: 'Back to hompage'
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
