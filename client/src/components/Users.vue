<template>
  <div class="users">
    
    <div id="main-users" v-if="isLoggedIn && isAdmin">
      <h1>{{ title }}</h1>
      <div class="table" v-if="users">
        <data-tables :data="users" :actions-def="actionsDef" :search-def="searchDef" :pagination-def="paginationDef" 
              :table-props="tableProps" :action-col-def="actionColDef" border style="width: 75%" @filtered-data="handleFilteredData">
          <el-table-column prop="username" label="Username" sortable="custom" ></el-table-column>
          <el-table-column prop="password" label="Password" sortable="custom"></el-table-column>
          <el-table-column prop="admin" label="Admin" sortable="custom"></el-table-column>
        </data-tables>
        <!--    New User dialog form add    -->
        <div class="dialog-form-add">
          <el-dialog title="Add a new user" :visible.sync="dialogAddFormVisible">
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
              <el-button @click="dialogAddFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="newSubmit()">Confirm</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="dialog-form-edit">
          <el-dialog title="Edit a user" :visible.sync="dialogEditFormVisible">
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
              <el-button @click="dialogEditFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="editSubmit()">Confirm</el-button>
            </span>
          </el-dialog>
        </div>
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
import json2csv from 'json2csv'

let CsvExport = function (data, fields, fieldNames, fileName) {
  try {
    var result = json2csv({
      data: data,
      fieldNames: fieldNames
    })
    var csvContent = 'data:text/csvcharset=GBK,\uFEFF' + result
    var encodedUri = encodeURI(csvContent)
    var link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${(fileName || 'file')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error(err)
  }
}

export default {
  name: 'home',
  data () {
    return {
      title: 'Registered users',
      users: [],
      filteredData: [],
      propsTable: ['username', 'password', 'admin'],
      errorMsg: 'there was a problem while loading the page, please refresh',
      apiPost: 'http://localhost:3000/api/users',
      editUsername: '',
      actionsDef: {
        def: [{
          name: 'export',
          handler: () => {
            CsvExport(this.filteredData, this.propsTable, this.data, 'Tuck Shop Users')
          },
          icon: 'upload'
        },
        {
          name: 'new',
          handler: () => {
            this.form = {
              username: '',
              password: '',
              confirmPassword: '',
              admin: false
            }
            this.dialogAddFormVisible = true
          }
        }]
      },
      paginationDef: {
        pageSizes: [5, 10, 15],
        currentPage: 1
      },
      dialogAddFormVisible: false,
      dialogEditFormVisible: false,
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
        colProps: {
          offset: 14,
          span: 5
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
            this.form = {
              username: '',
              password: '',
              confirmPassword: '',
              admin: false
            }
            this.dialogEditFormVisible = true
            this.editUsername = row.username
          },
          name: 'Edit'
        },
        {
          icon: 'delete',
          type: 'text',
          handler: row => {
            this.$confirm('This will permanently delete the user. Continue?', 'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              Vue.axios.delete(`http://localhost:3000/api/users/${row.username}`, {
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
              this.$message({
                type: 'success',
                message: 'Delete completed'
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Delete canceled'
              })
            })
          },
          name: 'Delete'
        }]
      }
    }
  },
  methods: {
    handleFilteredData (filteredData) {
      this.filteredData = filteredData
    },
    newSubmit () {
      if (this.form.password === this.form.confirmPassword) {
        this.dialogAddFormVisible = false
        this.form.admin = (this.form.admin === 'true')    // parse string to boolean
        Vue.axios.post(this.apiPost, {
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
    editSubmit () {
      if (this.form.password === this.form.confirmPassword) {
        this.dialogEditFormVisible = false
        this.form.admin = (this.form.admin === 'true')    // parse string to boolean
        Vue.axios.put(`http://localhost:3000/api/users/${this.editUsername}`, {
          username: this.form.username,
          password: this.form.password,
          admin: this.form.admin
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
    Vue.axios.get(this.apiPost).then(response => {
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
