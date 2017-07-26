<template>
  <div class="stocks">
    <h1>{{ title }}</h1>
    <div id="main-stocks">
      <div class="table" v-if="stocks">
        <data-tables :data="stocks" :search-def="searchDef" :table-props="tableProps" border style="width: 541px">
          <el-table-column prop="name" label="Name" width="180" sortable="custom"></el-table-column>
          <el-table-column prop="price" label="Price" width="180" sortable="custom"></el-table-column>
          <el-table-column prop="quantity" label="Quantity" width="180" sortable="custom"></el-table-column>
        </data-tables>
      </div>
      <div v-else>
        <p>{{ errorMsg }}</p>
      </div>
    </div>
    <h3><router-link to="/admin">Back to dashboard</router-link></h3>
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
      title: 'stocks available',
      stocks: [],
      errorMsg: '',
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
      }
    }
  },
  beforeMount () {
    const api = `http://localhost:3000/api/stocks`
    Vue.axios.get(api).then(response => {
      this.stocks = response.data
    })
  }
}
</script>

<style scoped>
.table{
  padding-left: 27%;
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
