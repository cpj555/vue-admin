import request from '@/utils/request'

export function getByDepartmentId(departmentId) {
  return request({
    url: 'hy/staff/department',
    method: 'get',
    params: { department_id: departmentId }
  })
}
