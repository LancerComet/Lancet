import { defineComponent, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import { LctList, LctGroupList, LctListItem, LctBtn } from '../../lib'
import { isArray } from '../../lib/utils/type'
import { pageConfig } from '../config/page'

import style from './app-drawer.module.styl'

const AppDrawer = defineComponent({
  setup () {
    const route = useRoute()

    const createListItem = (name: string, label: string) => (
      <LctListItem>
        <RouterLink to={{ name }}>
          <LctBtn
            class={style.navButton} textAlign='left'
            text={route.name !== name}
          >{label}</LctBtn>
        </RouterLink>
      </LctListItem>
    )

    const ListContent = pageConfig.map(config => {
      if (!isArray(config.pages)) {
        return createListItem(config.name as string, config.label)
      }

      const isOpen = ref(false)
      const childrenPageNames = config.pages.map(child => child.name)

      // Only watch for once to set initial status.
      const unwatch = watch(route, () => {
        const routeName = route.name as string
        isOpen.value = childrenPageNames.includes(routeName) ?? false
        unwatch()
      })

      return (
        <LctGroupList v-model={isOpen} icon={config.icon} text={config.label}>{
          config.pages.map(child => createListItem(child.name, child.label))
        }</LctGroupList>
      )
    })

    return () => (
      <div class={style.appDrawer}>
        <LctList>{ListContent}</LctList>
      </div>
    )
  }
})

export {
  AppDrawer
}
