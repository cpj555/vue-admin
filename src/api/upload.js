import request from '@/utils/request'

export function upload(query) {
  return request({
    url: '/upload',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'post',
    params: query
  })
}
