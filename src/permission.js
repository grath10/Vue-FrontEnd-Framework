import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.roleId.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there is a token
    /* has token */
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard, then afterEach hook will not be triggered, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // determine whether or not user info has been acquired
        store.dispatch('GetUserInfo').then(res => { // get user info
          const roles = res.data.roles
          store.dispatch('GenerateRoutesFromMenu', { roles }).then(() => { // get available routes by roles
            // add available routers
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
            // hack way to guarantee addRoutes has been done
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Verification failed, please login again')
            next({ path: '/login' })
          })
        })
      } else {
        // if no need to change permission dynamically, delete the following permission judgment
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    /* no token*/
    if (whiteList.indexOf(to.path) !== -1) { // if in no-login whitelist, pass directly
      next()
    } else {
      next('/login') // or else redirect to login
      NProgress.done() // if current page is login, then afterEach hook will not be triggered, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
