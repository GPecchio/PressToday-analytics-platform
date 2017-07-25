<template>
  <div class="stocks">
    <h1>{{ title }}</h1>
    <h3><router-link to="/admin">Back to dashboard</router-link></h3>
    <div id="example-1">
      <button v-on:click="getUsers()">Get users</button>
      <div v-if="users">
        <el-table :data="users" border>
          <el-table-column prop="username" label="Username" width="180"></el-table-column>
          <el-table-column prop="password" label="Password" width="180"></el-table-column>
        </el-table>
      </div>
      <div v-else>
        <p>{{ errorMsg }}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'home',
  data () {
    return {
      title: 'stocks available',
      users: [],
      errorMsg: ''
    }
  },
  methods: {
    getUsers () {
      const api = `http://localhost:3000/api/users`
      Vue.axios.get(api).then(response => {
        this.users = response.data
      })
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
