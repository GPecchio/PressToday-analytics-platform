<template>
  <div class="login">
    <h1>{{ title }} with your school<br>credentials</h1>
      <br>
    <el-card class="box-card">
      <el-form ref="" label-width="100px" class="demo-dynamic">
        <el-form-item prop="username" label="Username" type="text">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="Password" type="password">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <br>
        <el-form-item label-width="25px">
          <el-button type="primary" @click="login({ username, password })">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Login',
      password: '',
      username: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
