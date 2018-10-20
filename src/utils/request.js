import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/store2'
import qs from 'qs'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [
    function(data) {
      data = qs.stringify(data)
      return data
    }
  ]
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Access-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 2004) {
        console.log(1234)
        router.replace('/')
        // this.$router.push('/');
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
