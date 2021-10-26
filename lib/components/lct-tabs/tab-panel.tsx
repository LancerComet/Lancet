import { computed, defineComponent, inject, PropType, reactive } from 'vue'

import './index.styl'
import { EmitTabPanelsProvideKey } from './tab-panels'

const ComponentName = 'LctTabPanel'

const LctTabPanel = defineComponent({
  name: ComponentName,

  props: {
    value: {
      type: [Array, Boolean, String, Number, BigInt, Symbol, Function, Object] as PropType<unknown>
    }
  },

  setup (props, { slots }) {
    const tabPanels = inject(
      EmitTabPanelsProvideKey,
      {
        state: reactive({ active: null })
      }
    )

    const state = reactive({
      isActive: computed(() => {
        return tabPanels.state.active === props.value
      })
    })

    return () => (
      <div class={[
        state.isActive ? 'lct-tab-panel' : 'hide-bar'
      ]} >
        {slots.default && <>{slots.default?.()}</>}
      </div>
    )
  }
})

export {
  LctTabPanel
}
