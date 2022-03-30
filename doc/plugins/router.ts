import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { isArray } from '../../lib/utils/type'
import { IPageConfig, pageConfig } from '../config/page'

const routes: RouteRecordRaw[] = []

const addRoute = (item: IPageConfig) => {
  routes.push({
    name: item.name,
    path: item.path,
    component: item.component
  })
}

pageConfig.forEach(item => {
  if (isArray(item.pages)) {
    item.pages.forEach(addRoute)
  } else {
    addRoute(item as IPageConfig)
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

export {
  router
}
