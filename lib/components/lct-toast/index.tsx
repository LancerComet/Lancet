import { defineComponent, PropType } from 'vue'
import { LancetColorScheme } from '../../config/color'

import './index.styl'
import { updateDynamicStyle } from './style'

const ComponentName = 'LctToast'

/**
 * Toast组件.
 */
const LctToast = defineComponent({
  name: ComponentName,
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    text: {
      type: String as PropType<string>,
      default: ''
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: LancetColorScheme.Primary
    }
  },

  emits: ['update:modelValue'],

  setup (props, { slots }) {
    updateDynamicStyle()

    const createHtml = () => {
      return (
        <div class={[
          'lct-toast',
          `color-${props.color}`
        ]}>{slots.default?.() ?? props.text}</div>
      )
    }

    return () => (
      props.modelValue ? createHtml() : null
    )
  }
})
export {
  LctToast
}
