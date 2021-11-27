import { defineComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { LctBtn } from '../../lib'
import { pageConfig } from '../config/page'

import style from './app-drawer.module.styl'

const AppDrawer = defineComponent({
  setup () {
    const route = useRoute()

    return () => (
      <div class={style.appDrawer}>{
        pageConfig.map(item => (
          <RouterLink class={style.pageLink} to={{ name: item.name }} activeClass='primary-text'>
            <LctBtn
              class={style.linkButton}
              text={item.name !== route.name}
            >{ item.label }</LctBtn>
          </RouterLink>
        ))
      }</div>
    )
  }
})

export {
  AppDrawer
}
