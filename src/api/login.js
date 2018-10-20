import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    account: username,
    password: password
  }
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

