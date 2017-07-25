<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <ul>
      <li><h2><a href="#students" rel="noopener">Student</a></h2></li>
      <li><h2><a href="#admin" rel="noopener">Admin</a></h2></li>
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
