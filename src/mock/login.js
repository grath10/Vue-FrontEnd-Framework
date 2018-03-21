import { param2Obj } from '@/utils'

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
  }, {
    path: '/icon',
    leaf: false,
    children: [{
      path: 'index',
      name: 'icons',
      leaf: true,
      directory: 'svg-icons/index',
      meta: {
        title: 'icons',
        icon: 'icon',
        noCache: true
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
    return userMenuMap[roleId]
  }
}
