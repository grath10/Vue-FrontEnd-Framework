const _import = require('../router/_import_' + process.env.NODE_ENV)

import Layout from '../views/layout/Layout'

export function generateMenu(routers, data) {
  data.forEach((item) => {
    const menu = Object.assign({}, item)
    if (!item.leaf) {
      menu.component = Layout
      routers = generateMenu(menu.children = [], item.children)
      menu.children = routers
    } else {
      menu.component = _import(menu.directory)
    }
    routers.push(menu)
  })
  return routers
}
