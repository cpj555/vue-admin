import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/info',
    method: 'get'
  })
}

export function editInfo(data) {
  return request({
    url: '/info/edit',
    method: 'patch',
    data
  })
}

export function modifyPassword(data) {
  return request({
    url: '/info/modifyPassword',
    method: 'patch',
    data
  })
}
