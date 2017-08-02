<template>
  <div class="users">
    <div id="main-users" v-if="isLoggedIn && isAdmin">
      <h1>{{ title }}</h1>
      <div class="table" v-if="users">
        <data-tables :data="users" :actions-def="actionsDef" :search-def="searchDef" :table-props="tableProps" :action-col-def="actionColDef" border style="width: 75%">
          <el-table-column prop="username" label="Username" sortable="custom" ></el-table-column>
          <el-table-column prop="password" label="Password" sortable="custom"></el-table-column>
          <el-table-column prop="admin" label="Admin" sortable="custom"></el-table-column>
        </data-tables>
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
      </div>
      <div v-else>
        <p>{{ errorMsg }}</p>
      </div>
    </div>
    <div v-else-if="isLoggedIn && !isAdmin">
      <h1>You have to be logged in as admin to access this page</h1>
    </div>
    <div v-else-if="!isLoggedIn">
      <h1>You have to be logged in to access this page</h1>
    </div>
    <router-link to="/"><h3>Back</h3></router-link>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'home',
  data () {
    return {
      title: 'Registered users',
      users: [],
      errorMsg: 'there was a problem while loading the page, please refresh',
      api: 'http://localhost:3000/api/users',
      actionsDef: {
        def: [{
          name: 'new',
          handler: () => {
            this.dialogFormVisible = true
          }
        }]
      },
      dialogFormVisible: false,
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
      },
      tableProps: {
        defaultSort: {
          prop: 'username',
          order: 'ascending'
        }
      },
      actionColDef: {
        label: 'Actions',
        def: [{
          icon: 'edit',
          type: 'text',
          handler: row => {
            this.$message('Edit clicked')
          },
          name: 'Edit'
        }, {
          icon: 'delete',
          type: 'text',
          handler: row => {
            this.$message('Delete clicked')
          },
          name: 'Delete'
        }]
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
    },
    getRowActionsDef () {
      let self = this
      return [{
        type: 'primary',
        handler (row) {
          self.$message('Edit clicked')
          console.log('Edit in row clicked', row)
        },
        name: 'Edit'
      }]
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    isAdmin () {
      return this.$store.getters.isAdmin
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
.table{
  padding-left: 20%;
}
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
