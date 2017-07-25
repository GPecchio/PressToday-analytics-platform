<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <ul>
      <li><h2><router-link to="/students">Students</router-link></h2></li>
      <li><h2><router-link to="/admin">Admin</router-link></h2></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      title: 'Welcome to the Tuck Shop Manager!'
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
