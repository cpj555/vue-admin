import request from '@/utils/request'

export function getAll() {
  return request({
    url: 'hy/department/list',
    method: 'get'
  })
}
