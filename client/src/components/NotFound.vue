<template>
  <div class="NotFound">
    <h1>{{ title }}</h1>
    <router-link to="/"><h3>{{ back }}</h3></router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      title: '404 - The page requested was not found',
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
