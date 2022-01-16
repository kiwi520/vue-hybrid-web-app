import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.interceptors.response.use(response => {
  return response.data.data
}, err => {
  return Promise.reject(err)
})

Vue.prototype.$http = axios
