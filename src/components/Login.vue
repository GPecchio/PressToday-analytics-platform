<template>
  <div>
    <el-alert class="alert" v-if="isLoggedIn" title="Login successful" type="success" description="You are now logged in" show-icon></el-alert>
    <div class="login" v-if="!isLoggedIn">
      <h1>{{ title }} with your school<br>credentials</h1>
        <br>
      <el-card class="box-card">
        <el-form ref="" label-width="100px" class="demo-dynamic">
          <el-form-item prop="username" label="Username" type="text">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
          <br>
          <el-form-item label-width="25px">
            <el-button type="primary" @click="login({ username, password })">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="else-login" v-if="isLoggedIn">
      <h1>You are already logged in</h1>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Login',
      password: '',
      username: '',
      dialogVisible: false
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.dialogVisible = true
        this.$router.push('/')
      })
    },
    handleClose (done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style scoped>
a:enabled{
  text-decoration: none;
  color: #2979ff;
}

.box-card {
  padding-top: 15px;
  padding-right: 25px;
  margin-left: 36.5%;
  width: 25%;
}

.alert{
  margin-top: -20px;
  margin-right: 20px;
  width: 25%;
  float: right;
  z-index: 0;
  position: relative;
}

.else-login{
  margin-left: 36.5%;
  z-index: -1;
  position: absolute;
}
</style>
