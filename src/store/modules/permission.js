import { asyncRouterMap, constantRouterMap } from '@/router'
// import { constantRouterMap } from '@/router'
import { getMenu } from '@/api/login'
import { generateMenu } from '@/utils/menu'
import Layout from '../../views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      /* const { roles } = data
      return new Promise((resolve, reject) => {
        getMenu(roles).then(response => {
          const accessedRouters = response.data
          commit('SET_ROUTERS', accessedRouters)
          resolve(accessedRouters)
        }).catch(error => {
          reject(error)
        })
      }) */
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    GenerateRoutesFromMenu({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { role, roleId } = data.roles
        let accessedRouters = []
        if (role.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        } else {
          getMenu(roleId).then(response => {
            const data = response.data
            const menus = data
            menus.forEach((item) => {
              const menu = Object.assign({}, item)
              menu.component = Layout
              generateMenu(menu.children = [], item.children)
              accessedRouters.push(menu)
            })
            commit('SET_ROUTERS', accessedRouters)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }
      })
    }
  }
}

export default permission
