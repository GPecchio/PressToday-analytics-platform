<template>
  <div class="stocks">
    <div id="main-sell">
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
                  <label>Quantity:</label>
                  <el-input-number v-model.number="row.quantity" :change="handleChange" :step="1" :min="0" :max="1000"></el-input-number>
                </td>
                <td style="text-align: left; width: 30%; float: left;">
                  <label>Price:</label><br>
                  <el-input-number v-model.number="row.price" :change="handleChange" :step="0.1" :min="0" :max="1000"></el-input-number>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
        <div>
          <p style="text-align: left; margin-left: 20px; margin-right: 20px;"><b>Overview:</b></p>
          <ul class="overview-list" v-for="(row, index) in rows" v-bind:key="(row, index)">
              <li>Product number {{ index + 1 }}: {{ row.name }}</li>
              <li>Quantity: {{ row.quantity }}</li>
              <li>Price: £{{ row.price }}</li>    
          </ul>
        </div>
        <div style="position: relative; margin-top: 20px;">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">Sell</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'home',
  data () {
    return {
      title: 'Sell',
      rows: [],
      productsNumber: 0
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
      this.rows.splice(index, 1)
    }
  },
  beforeMount () {
    this.addRow()
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
