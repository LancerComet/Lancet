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
    name: 'dialog-showcase',
    path: '/dialog',
    label: 'Dialog',
    component: () => import('../views/showcase.dialog').then(item => item.DialogShowcase)
  },
  {
    name: 'dynamic-color',
    path: '/dynamic-color',
    label: 'Dynamic Color',
    component: () => import('../views/showcase.dynamic-color').then(item => item.DynamicColor)
  },
  {
    name: 'typography-showcase',
    path: '/typography',
    label: 'Typography',
    component: () => import('../views/showcase.typography').then(item => item.TypographyShowcase)
  }
]

export {
  pageConfig
}
