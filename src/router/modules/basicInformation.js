import Layout from '@/layout'

const basicInformation = {
  path: '/basic_information',
  component: Layout,
  redirect: 'noRedirect',
  name: 'basic_information',
  meta: {
    title: '基础资料',
    icon: 'basic_information',
    roles: ['/basicInformation']
  },
  children: [
    {
      path: 'member',
      component: () => import('@/views/member/list'),
      name: 'memberList',
      meta: { title: '会员资料', icon: 'basic_people', roles: ['/dashboard/member/list'] }
    },
    {
      path: 'hydepartment',
      component: () => import('@/views/hydepartment/list'),
      name: 'hyDepartmentList',
      meta: { title: 'hyDepartmentList', noCache: true, roles: ['/dashboard/hy/department/list'] }
    }
  ]
}

export default basicInformation
