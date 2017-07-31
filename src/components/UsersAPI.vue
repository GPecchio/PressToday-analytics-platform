<template>
  <div class="users">
    <h1>{{ title }}</h1>
    <div id="main-users">
      <div class="table" v-if="users">
        <data-tables :data="users" :actions-def="actionsDef" :search-def="searchDef" :table-props="tableProps" :action-col-def="actionColDef" border style="width: 75%">
          <el-table-column prop="username" label="Username" sortable="custom" ></el-table-column>
          <el-table-column prop="password" label="Password" sortable="custom"></el-table-column>
        </data-tables>
      </div>
      <div v-else>
        <p>{{ errorMsg }}</p>
      </div>
    </div>
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
      actionsDef: {
        def: [{
          name: 'new',
          handler: () => {
            this.$message('new clicked')
          }
        }]
      },
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
            this.$message('Delete row clicked')
          },
          name: 'Delete'
        }]
      }
    }
  },
  methods: {
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
  beforeMount () {
    const api = `http://localhost:3000/api/users`
    Vue.axios.get(api).then(response => {
      this.users = response.data
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
