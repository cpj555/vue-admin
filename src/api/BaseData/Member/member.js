import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'member/list',
    method: 'get',
    data
  })
}
