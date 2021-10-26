import { computed, defineComponent, PropType, provide, reactive } from 'vue'
import { randomString } from '../../utils/random'

import './index.styl'

const ComponentName = 'LctTabPanels'
const EmitTabPanelsProvideKey = 'tabPanels' + randomString()

const LctTabPanels = defineComponent({
  name: ComponentName,

  props: {
    color: {
      type: String as PropType<string>
    },

    modelValue: {
      type: [Array, Boolean, String, Number, BigInt, Symbol, Function, Object] as PropType<unknown>
    }
  },
  emits: ['update:modelValue'],

  setup (props, { slots }) {
    const state: unknown = reactive({
      active: computed(() => props.modelValue)
    })

    provide(EmitTabPanelsProvideKey, {
      state
    })

    return () => (
      <div class='lct-tab-panels'>
        { slots.default?.() }
      </div>
    )
  }
})

export {
  LctTabPanels,
  EmitTabPanelsProvideKey
}
