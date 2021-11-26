const pageConfig = [
  {
    name: 'index',
    path: '/',
    label: 'Home',
    component: () => import('../views/index').then(item => item.IndexPage)
  },
  {
    name: 'dynamic-color',
    path: '/dynamic-color',
    label: 'Dynamic Color',
    component: () => import('../views/dynamic-color').then(item => item.DynamicColor)
  }
]

export {
  pageConfig
}
