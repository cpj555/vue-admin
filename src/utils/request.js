import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { SUCCESS, ERROR_AUTH_FAILED, ERROR_REFRESH_TOKEN, POOR_ROLES } from '@/utils/Constants/Code'
import store2 from 'store2'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Access-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
let isRefreshing = false

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === SUCCESS) {
      Message({
        message: res.message || '请求成功',
        type: 'success',
        duration: 5 * 1000
      })
      return res
    } else {
      switch (res.code) {
        case POOR_ROLES:
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          router.push('/')
          break
        case ERROR_REFRESH_TOKEN:
          if (!isRefreshing) {
            isRefreshing = true
            return store.dispatch('user/refreshToken').then(() => {
              const config = response.config
              config.baseURL = ''
              return service(config)
            }).catch((err) => {
              console.log(err)
              // store2.session.clearAll()
            }).finally(() => {
              isRefreshing = false
            })
          }
          break
        case ERROR_AUTH_FAILED:
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          store2.session.clearAll()
          window.location.reload()
          break
        default:
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          break
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
