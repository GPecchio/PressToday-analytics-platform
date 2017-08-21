<template>
  <div class="login">
    <h1>{{ title }} with your school<br>credentials</h1>
      <br>
    <el-card class="box-card">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item prop="username" label="Username":rules="
        [{ required: true, message: 'Please input username', trigger: 'blur' }]">
          <el-input v-model="dynamicValidateForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="Password" :rules="
            [{ required: true, message: 'Please input password', trigger: 'blur' },
            { min: 6, message: 'Your password is too short!' }]">
          <el-input v-model="dynamicValidateForm.password"></el-input>
        </el-form-item>
        <br>
        <el-form-item label-width="25px">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      title: 'Login',
      dynamicValidateForm: {
        password: '',
        username: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm.username, this.dynamicValidateForm.password)
        } else {
          console.log('error submit!!')
          return false
        }
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

.box-card {
  padding-top: 15px;
  padding-right: 25px;
  margin-left: 36.5%;
  width: 25%;
}
</style>
