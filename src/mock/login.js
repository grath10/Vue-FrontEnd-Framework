import { param2Obj } from '@/utils'
// import Vue from 'vue'
// import Layout from '../views/layout/Layout'
// const _import = require('../router/_import_' + process.env.NODE_ENV)

const userMap = {
  admin: {
    roles: {
      roleId: 'admin',
      role: 'ROLES_ADMIN'
    },
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: {
      roleId: 'editor',
      role: 'ROLES_EDITOR'
    },
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

/* const Layout = Vue.extend(require('../views/layout/Layout').default)
const menuMap = {
  admin: [{
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  }]
} */

const userMenuMap = {
  admin: [{
    path: '/permission',
    leaf: false,
    children: [{
      path: 'index',
      name: 'permission',
      leaf: true,
      directory: 'permission/index',
      meta: {
        title: 'permission',
        icon: 'lock'
      }
    }]
  }],
  editor: [{
    path: '/permission',
    leaf: false,
    children: [{
      path: 'index',
      name: 'permission',
      leaf: true,
      directory: 'permission/index',
      meta: {
        title: 'permission',
        icon: 'lock'
      }
    }]
  }]
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success',
  getMenu: config => {
    const { roleId } = param2Obj(config.url)
    // return menuMap[roleId]
    return userMenuMap[roleId]
  }
}
