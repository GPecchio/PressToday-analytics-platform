<template>
  <div class="stocks">
    <div id="main-stocks" v-if="isLoggedIn && isAdmin">
      <h1>{{ title }}</h1>
      <div class="table" v-if="stocks">
        <data-tables :data="stocks" :actions-def="actionsDef" :search-def="searchDef" :pagination-def="paginationDef"
              :table-props="tableProps" :action-col-def="actionColDef" border style="width: 75%" @filtered-data="handleFilteredData">
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
              <el-input-number v-model.number="form.price" :change="handleChange" :step="0.1" :min="0" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item label="Quantity" :label-width="formLabelWidth">
              <el-input-number v-model.number="form.quantity" :change="handleChange" :step="1" :min="0" :max="1000"></el-input-number>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="newSubmit()">Confirm</el-button>
          </span>
        </el-dialog>
        <el-dialog title="Edit a stock" :visible.sync="dialogEditFormVisible">
          <el-form :model="form">
            <el-form-item label="Name" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Price" :label-width="formLabelWidth">
              <el-input-number v-model.number="form.price" :change="handleChange" :step="0.1" :min="0" :max="1000" style="margin-left: 8.5%"></el-input-number>
            </el-form-item>
            <el-form-item label="Total quantity" :label-width="formLabelWidth">
              <el-input-number v-model.number="form.quantity" :change="handleChange" :step="1" :min="0" :max="1000"></el-input-number>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEditFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="editSubmit()">Confirm</el-button>
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
      title: 'Stocks available',
      stocks: [],
      filteredData: [],
      propsTable: ['name', 'quantity', 'price'],
      errorMsg: 'there was a problem while loading the page, please refresh',
      api: 'http://localhost:3000/api/stocks',
      editName: '',
      actionsDef: {
        def: [{
          name: 'export',
          handler: () => {
            CsvExport(this.filteredData, this.propsTable, this.data, 'Tuck Shop Stocks')
          },
          icon: 'upload'
        },
        {
          name: 'new',
          handler: () => {
            this.dialogFormVisible = true
          }
        }]
      },
      paginationDef: {
        pageSizes: [10, 25, 50],
        currentPage: 1
      },
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      form: {
        name: '',
        price: 0,
        quantity: 0
      },
      searchDef: {
        inputProps: {
          placeholder: 'search'
        },
        colProps: {
          offset: 14,
          span: 5
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
            this.form = {
              name: '',
              price: '',
              quantity: ''
            }
            this.dialogEditFormVisible = true
            this.editName = row.name
          },
          name: 'Edit'
        },
        {
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
    handleFilteredData (filteredData) {
      this.filteredData = filteredData
    },
    newSubmit () {
      this.form.name = this.form.name.substring(0, 1).toUpperCase() + this.form.name.substring(1, this.form.name.length)
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
    },
    editSubmit () {
      this.dialogEditFormVisible = false
      this.form.name = this.form.name.substring(0, 1).toUpperCase() + this.form.name.substring(1, this.form.name.length)
      Vue.axios.put(`http://localhost:3000/api/stocks/edit/${this.editName}`, {
        name: this.form.name,
        price: this.form.price,
        quantity: this.form.quantity
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
