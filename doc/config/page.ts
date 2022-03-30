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
    component: () => import('../views/home/index').then(item => item.IndexPage)
  },
  {
    name: 'color-theming',
    path: '/color-theming',
    label: 'Tone',
    component: () => import('../views/tone').then(item => item.DynamicColor)
  },
  {
    name: 'typography-showcase',
    path: '/typography',
    label: 'Typography',
    component: () => import('../views/typography').then(item => item.Typography)
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
        name: 'toast-showcase',
        path: '/toast',
        label: 'Toast',
        component: () => import('../views/showcase.toast').then(item => item.ToastShowcase)
      }
    ]
  }
]

export {
  pageConfig,
  IPageConfig
}