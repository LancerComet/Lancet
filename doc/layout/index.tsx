import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import { LctNavView } from '../../lib'
import { ActionBar } from '../components/action-bar'
import { AppDrawer } from '../components/app-drawer'

import style from './index.module.styl'

const AppLayout = defineComponent({
  setup () {
    return () => (
      <LctNavView
        class={style.appLayout}
        v-slots={{
          frame: () => <RouterView />,
          drawer: () => <AppDrawer />,
          actionBar: () => <ActionBar />
        }}
      />
    )
  }
})

export {
  AppLayout
}
