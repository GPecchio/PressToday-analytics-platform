<template>
  <div class="students">
    <h1>{{ title }}</h1>
    <h3><a href="/" rel="noopener">{{ back }}</a></h3>
  </div>
</template>

<script>
export default {
  name: 'students',
  data () {
    return {
      title: 'student dashboard',
      back: 'back to hompage'
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
