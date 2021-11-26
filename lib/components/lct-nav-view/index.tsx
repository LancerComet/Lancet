import { defineComponent, PropType, ref } from 'vue'

import './index.styl'
import { LctBtn, LctIcon, LctMica } from '../index'

const LctNavView = defineComponent({
  props: {
    micaBrightness: {
      type: Number as PropType<number>,
      default: 0.7
    }
  },

  setup (props, { slots }) {
    const isDrawerOpen = ref(true)

    const toggleOpen = () => {
      isDrawerOpen.value = !isDrawerOpen.value
    }

    return () => (
      <div class='lct-nav-view'>
        <div
          class={['lct-nav-view-drawer', isDrawerOpen.value ? 'open' : 'closed']}
        >
          <LctMica
            class='lct-nav-view-drawer-content'
            brightness={props.micaBrightness}
          >{slots.drawer?.()}</LctMica>
        </div>

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
