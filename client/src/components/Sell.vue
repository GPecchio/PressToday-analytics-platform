<template>
  <div class="stocks">
    <div id="main-sell" v-if="isLoggedIn">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="float: left;" class="title">{{ title }}</span>
          <div style="float: right;">
            <span class="productsNumberLabel">
              <b>How many products to sell?</b>
            </span>
            <span style="margin-right: 10px;">{{ productsNumber }}</span>
            <span v-if="productsNumber > 1"><el-button @click="removeElement(index)" icon="minus"></el-button></span>
            <span v-else><el-button :disabled="true" icon="minus"></el-button></span>
            <span v-if="productsNumber < 10"><el-button @click="addRow()" icon="plus" style="margin-left: -3px;"></el-button></span>
            <span v-else><el-button :disabled="true" icon="plus"></el-button></span>
          </div>
        </div>
        <table class="table">
          <tbody>
            <tr v-for="(row, index) in rows" v-bind:key="(row, index)">
              <div style="margin: 10px; margin-top: 20px;">
                <b style="text-align: left; width: 100%; float: left;">Product number: {{ index + 1 }}</b>
                <td style="text-align: left; width: 100%; float: left;">
                  <label>Name:</label>
                  <el-input v-model="row.name"></el-input>
                </td>
                <td style="text-align: left; width: 30%; float: left;">
                  <label style="margin-right: 75px;">Quantity:</label>
                  <el-input-number v-model.number="row.quantity" :change="handleChange" :step="1" :min="0" :max="100"></el-input-number>
                </td>
                <td style="text-align: left; width: 30%; float: left;">
                  <label>Price:</label><br>
                  <el-input-number v-model.number="row.price" :change="handleChange" :step="0.1" :min="0" :max="10"></el-input-number>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
        <div>
          <p style="text-align: left; margin-left: 20px; margin-right: 20px;"><b>Overview:</b></p>
          <ul class="overview-list" v-for="(row, index) in rows" v-bind:key="(row, index)">
              <li>Product number {{ index + 1 }}: <b>{{ row.name.substring(0,1).toUpperCase() + row.name.substring(1,row.name.length) }}</b></li>
              <li>Quantity: <b>{{ row.quantity }}</b></li>
              <li>Total Price: <b>£{{ (row.price * row.quantity).toFixed(2) }}</b></li>   
          </ul>
        </div>
        <div style="position: relative; margin-top: 20px;">
          <el-button type="primary" @click="submitForm()">Sell</el-button>
        </div>
      </el-card>
    </div>
    <div v-if="!isLoggedIn">
      <h1>You have to be logged in to access this page</h1>
    </div>
    <router-link to="/"><h3>Back</h3></router-link>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'

export default {
  name: 'home',
  data () {
    return {
      title: 'Sell',
      stocks: [],
      rows: [],
      index1: 0,
      api: 'http://localhost:3000/api/stocks',
      putApi: '',
      productsNumber: 0
    }
  },
  methods: {
    submitForm () {
      for (var j = 0; j < this.rows.length; j++) {
        this.rows[j].name = this.rows[j].name.substring(0, 1).toUpperCase() + this.rows[j].name.substring(1, this.rows[j].name.length)
        for (var i = 0; i < this.stocks.length; i++) {
          if (this.stocks[i].name === this.rows[j].name && this.stocks[i].quantity >= this.rows[i].quantity) {
            this.putApi = `http://localhost:3000/api/stocks/${this.rows[j].name}`
            Vue.axios.put(this.putApi, {
              quantity: this.rows[j].quantity
            })
            .then(this.$notify({
              type: 'success',
              title: 'Success',
              message: `Items were sold`,
              duration: 3000
            }))
            .catch(e => {
              this.errors.push(e)
            })
          }
        }
      }
    },
    addRow () {
      this.productsNumber += 1
      this.rows.push({
        name: '',
        quantity: 0,
        price: 0
      })
    },
    removeElement (index) {
      this.productsNumber -= 1
      this.rows.splice(-1, 1)
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  beforeMount () {
    this.addRow()
    Vue.axios.get(this.api).then(response => {
      this.stocks = response.data
      this.stocks = this.stocks.stocks
    })
  }
}
</script>

<style scoped>
a:enabled {
  text-decoration: none;
  color: #2979ff;
}

.title {
  font-size: 36px;
  line-height: 36px;
  font-weight: 700;
}

.productsNumberLabel {
  margin-right: 10px;
}

.clearfix {
  padding-bottom: 6%;
}

.overview-list {
  list-style-type: none;
  text-align: left;
}

.box-card {
  padding-top: 15px;
  padding-right: 25px;
  margin-left: 12.5%;
  width: 75%;
}
</style>
