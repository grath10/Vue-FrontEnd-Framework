import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getMenu(roleId) {
  return request({
    url: '/user/menu',
    method: 'get',
    params: { roleId }
  })
}

export function getFilteredMenu(roleId) {
  return request({
    url: '/user/filterMenu',
    method: 'get',
    params: { roleId }
  })
}
