<template>
  <div class="stocks">
    <div id="main-stocks" v-if="isLoggedIn && isAdmin">
      <h1>{{ title }}</h1>
      <div class="table" v-if="stocks">
        <data-tables :data="stocks" :actions-def="actionsDef" :search-def="searchDef" :table-props="tableProps" :action-col-def="actionColDef" border style="width: 75%">
          <el-table-column prop="name" label="Name" sortable="custom"></el-table-column>
          <el-table-column prop="price" label="Price" sortable="custom"></el-table-column>
          <el-table-column prop="quantity" label="Quantity" sortable="custom"></el-table-column>
        </data-tables>
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
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'home',
  data () {
    return {
      title: 'Stocks available',
      stocks: [],
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
        props: 'name'
      },
      tableProps: {
        defaultSort: {
          prop: 'name',
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
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  beforeMount () {
    const api = `http://localhost:3000/api/stocks`
    Vue.axios.get(api).then(response => {
      this.stocks = response.data
      this.stocks = this.stocks.stocks
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
