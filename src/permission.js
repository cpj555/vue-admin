import router from './router/index'
import store from './store/index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/passport', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/passport') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const permission_routes = store.getters.permission_routes && store.getters.permission_routes.length > 0
      if (permission_routes) {
        next()
      } else {
        // 第一次初始化路由和f5刷新页面时根据vuex中的permission_routes为空重新加载路由
        const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
        router.addRoutes(accessRoutes)
        next({ ...to, replace: true })
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/passport?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
