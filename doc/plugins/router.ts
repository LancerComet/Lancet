import { createRouter, createWebHistory } from 'vue-router'
import { pageConfig } from '../config/page'

const router = createRouter({
  history: createWebHistory(),
  routes: pageConfig
    .map(item => ({
      name: item.name,
      path: item.path,
      component: item.component
    }))
})

export {
  router
}
