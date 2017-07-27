<template>
  <div class="stocks">
    <div id="main-sell">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="float: left;" class="title">{{ title }}</span>
        </div>
        <div>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <div>
                    <el-form-item prop="name" label="Name" :rules="[{ required: true, message: 'Please input product name', trigger: 'blur' }]">
                    <el-input v-model="dynamicValidateForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Quantity" prop="quantity" :rules="[{ required: true, message: 'Please input product quantity'}]" style="text-align: left; width: 30%; float: left;">
                        <el-input-number v-model.number="dynamicValidateForm.quantity" :change="handleChange" :min="0" :max="1000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Price" prop="price" :rules="[{ required: true, message: 'Please input product price'}]" style="text-align: left; width: 70%; float: left;">
                        <el-input-number v-model.number="dynamicValidateForm.price" :change="handleChange" :step="0.1" :min="0" :max="1000"></el-input-number>
                    </el-form-item>
                </div> 
                <div>
                    <p style="text-align: left; margin-left: 20px; margin-right: 20px;"><b>Overview:</b></p>
                    <ul class="overview-list">
                        <li>Product: {{ dynamicValidateForm.name }}</li>
                        <li>Quantity: {{ dynamicValidateForm.quantity }}</li>
                        <li>Price: £{{ dynamicValidateForm.price }}</li>    
                    </ul>
                </div>
                <div style="position: relative;">
                    <el-form-item label-width="25px">
                        <el-button type="primary" @click="submitForm('dynamicValidateForm')">Sell</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
      </el-card>
    </div>
    <h3><router-link to="/admin">{{ back }}</router-link></h3>
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
      title: 'Sell',
      back: 'Back to homepage',
      dynamicValidateForm: {
        name: '',
        quantity: '',
        price: ''
      }
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
    }
  }
}
</script>

<style scoped>
a:enabled{
  text-decoration: none;
  color: #2979ff;
}

.title{
  font-size: 36px;
  line-height: 36px;
  font-weight: 700;
}

.clearfix{
  padding-bottom: 6%;
}

.overview-list{
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
