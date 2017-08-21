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
        <el-dialog title="Add a new stock" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="Name" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Price" :label-width="formLabelWidth">
              <el-input-number v-model.number="form.price" :change="handleChange" :step="1" :min="0" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item label="Quantity" :label-width="formLabelWidth">
              <el-input-number v-model.number="form.quantity" :change="handleChange" :step="1" :min="0" :max="1000"></el-input-number>
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
      title: 'Stocks available',
      stocks: [],
      errorMsg: 'there was a problem while loading the page, please refresh',
      api: 'http://localhost:3000/api/stocks',
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
        name: '',
        price: 0,
        quantity: 0
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
          icon: 'delete',
          type: 'text',
          handler: row => {
            this.$confirm('This will permanently delete the stock. Continue?', 'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              Vue.axios.delete(`http://localhost:3000/api/stocks/${row.name}`, {
              })
              .then(response => {
                this.stocks = response.data
                this.stocks = this.stocks.stocks
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
    handleChange (value) {
      console.log(value)
    },
    confirmSubmit () {
      this.dialogFormVisible = false
      Vue.axios.post(this.api, {
        body: this.form
      })
      .then(response => {
        this.stocks = response.data
        this.stocks = this.stocks.stocks
      })
      .catch(e => {
        this.errors.push(e)
      })
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
