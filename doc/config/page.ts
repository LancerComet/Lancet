interface IPageConfig {
  name: string
  path: string
  label: string
  icon?: string
  component: any
  pages?: never
}

interface IGroupConfig {
  name?: string
  label: string
  icon?: string
  pages: IPageConfig[]
}

const pageConfig: (IPageConfig | IGroupConfig)[] = [
  {
    name: 'index',
    path: '/',
    label: 'Home',
    component: () => import('../views/index').then(item => item.IndexPage)
  },
  {
    name: 'color-theming',
    path: '/color-theming',
    label: 'Color Theming',
    component: () => import('../views/showcase.dynamic-color').then(item => item.DynamicColor)
  },
  {
    label: 'Components',
    pages: [
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
        name: 'typography-showcase',
        path: '/typography',
        label: 'Typography',
        component: () => import('../views/showcase.typography').then(item => item.TypographyShowcase)
      }
    ]
  }
]

export {
  pageConfig,
  IPageConfig
}
