import { defineComponent, PropType, ref } from 'vue'

import './index.styl'
import { LctBtn, LctIcon, LctMica } from '../index'

const LctNavView = defineComponent({
  props: {
    micaOpacity: {
      type: Number as PropType<number>,
      default: 0.3
    }
  },

  setup (props, { slots }) {
    const isDrawerOpen = ref(true)

    const toggleOpen = () => {
      isDrawerOpen.value = !isDrawerOpen.value
    }

    return () => (
      <div class='lct-nav-view'>
        <LctMica
          class={['lct-nav-view-drawer', isDrawerOpen.value ? 'open' : 'closed']}
          opacity={props.micaOpacity}
        >
          <aside class='lct-nav-view-drawer-content'>{slots.drawer?.()}</aside>
        </LctMica>

        <div class={[
          'lct-nav-view-frame',
          isDrawerOpen.value ? 'drawer-open' : null
        ]}>{slots.frame?.()}</div>

        <LctBtn
          class='lct-nav-drawer-button' transparent
          onClick={toggleOpen}
        >
          <LctIcon>menu</LctIcon>
        </LctBtn>
      </div>
    )
  }
})

export {
  LctNavView
}
