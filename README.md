English | [简体中文](./README.zh-CN.md)

## Introduction

**Note: This project is based on element-ui@2.0.0+ version, so the minimum compatible vue@2.5.0+**

## Preparation

You need to install [node](http://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 和 [element-ui](https://github.com/ElemeFE/element). All data requests for this project are simulated using [Mock.js](https://github.com/nuysoft/Mock). It would be helpful if you have pre-existing knowledge on those.

 **This project is not a scaffolding and is more of an integrated solution.**

 **This project does not support low version browsers (e.g. IE). Please add polyfill yourself if you need them.**

 <p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>

## Features
```
- Login / Logout
- I18n
```

## Getting started

```bash
# clone the project
git clone https://github.com/grath10/Vue-FrontEnd-Framework.git

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527.

## Build
```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

## Advanced
```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

Reference:
[Documentation](https://panjiachen.github.io/vue-element-admin-site/#/deploy)
