<template>
  <el-dialog title="Add a new user" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="Username" :label-width="formLabelWidth">
        <el-input v-model="form.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" :label-width="formLabelWidth">
        <el-input v-model="form.password" auto-complete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm password" :label-width="formLabelWidth">
        <el-input v-model="form.confirmPassword" auto-complete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Admin" :label-width="formLabelWidth">
        <el-radio class="radio" v-model="form.admin" :value="true" label="true">True</el-radio>
        <el-radio class="radio" v-model="form.admin" :value="false" label="false">False</el-radio>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="confirmSubmit()">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'home',
  data () {
    return {
      users: [],
      api: 'http://localhost:3000/api/users',
      dialogFormVisible: true,
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        admin: false
      },
      formLabelWidth: '130px',
      searchDef: {
        inputProps: {
          placeholder: 'search'
        },
        props: 'username'
      }
    }
  },
  methods: {
    confirmSubmit () {
      if (this.form.password === this.form.confirmPassword) {
        this.dialogFormVisible = false
        this.form.admin = (this.form.admin === 'true')    // parse string to boolean
        Vue.axios.post(this.api, {
          body: this.form
        })
          .then(response => {
            this.users = response.data
            this.users = this.users.users
            for (var i = 0; i < this.users.length; i++) {
              this.users[i].admin = this.users[i].admin.toString()
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        this.$notify.error({
          title: 'Error',
          message: 'Passwords do not match'
        })
      }
    }
  },
  beforeMount () {
    Vue.axios.get(this.api).then(response => {
      this.users = response.data
      this.users = this.users.users
      for (var i = 0; i < this.users.length; i++) {
        this.users[i].admin = this.users[i].admin.toString()
      }
    })
  }
}
</script>

<style scoped>
.table {
  padding-left: 20%;
}

a:enabled {
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
