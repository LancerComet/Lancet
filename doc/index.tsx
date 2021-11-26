import { defineComponent, createApp } from 'vue'

import 'material-icons/iconfont/material-icons.css'

import { Lancet, LctApp } from '../lib'
import { AppLayout } from './layout'
import { router } from './plugins/router'

const Layout = defineComponent({
  name: 'TestPage',
  setup () {
    return () => (
      <LctApp>
        <AppLayout/>
      </LctApp>
    )
  }
})

const app = createApp(Layout)
app.use(Lancet)
app.use(router)
app.mount('#app')
