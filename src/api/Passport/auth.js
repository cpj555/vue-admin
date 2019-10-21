import request from '@/utils/request'

export function auth(data) {
  return request({
    url: 'passport/auth',
    method: 'post',
    data
  })
}

export function refresh(refreshToken) {
  return request({
    url: 'passport/refresh',
    method: 'post',
    data: { 'refresh_token': refreshToken }
  })
}
