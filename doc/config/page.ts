const pageConfig = [
  {
    name: 'index',
    path: '/',
    label: 'Home',
    component: () => import('../views/index').then(item => item.IndexPage)
  },
  {
    name: 'button-showcase',
    path: '/button',
    label: 'Button',
    component: () => import('../views/showcase.button').then(item => item.ButtonShowcase)
  },
  {
    name: 'typography-showcase',
    path: '/typography',
    label: 'Typography',
    component: () => import('../views/showcase.typography').then(item => item.TypographyShowcase)
  },
  {
    name: 'dynamic-color',
    path: '/dynamic-color',
    label: 'Dynamic Color',
    component: () => import('../views/showcase.dynamic-color').then(item => item.DynamicColor)
  }
]

export {
  pageConfig
}
