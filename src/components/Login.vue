<template>
  <div class="login">
    <h1>{{ title }}</h1>
    <h3><router-link to="/">{{ back }}</router-link></h3>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      title: 'Login with your school username and pawssword to continue',
      back: 'back to homepage'
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
