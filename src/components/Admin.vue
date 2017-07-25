<template>
  <div class="admin">
    <h1>{{ title }}</h1>
    <h3><a href="/" rel="noopener">{{ back }}</a></h3>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      title: 'admin dashboard',
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
