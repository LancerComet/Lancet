import { computed, defineComponent, PropType } from 'vue'

import { LctColorScheme } from '../../config/color'
import { isNumber, isString } from '../../utils/type'

import './index.styl'

const LctProgressLinear = defineComponent({
  name: 'LctProgressLinear',

  props: {
    height: {
      type: [Number, String] as PropType<number | string>,
      default: 4
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: null
    },

    indeterminate: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    fullWidth: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup (props) {
    const bodyStyle = computed(() => {
      return {
        height: isNumber(props.height)
          ? props.height + 'px'
          : props.height,
        width: props.fullWidth
          ? '100%'
          : undefined
      }
    })

    const visibilityStyle = computed(() => {
      return {
        display: props.indeterminate ? undefined : 'none'
      }
    })

    return () => (
      <div class={[
        'lct-progress-linear',
        isString(props.color) ? `${props.color}-text` : null
      ]} role='progressbar' style={bodyStyle.value}>
        <div class='progress-background' />
        <div class='progress-body-container' style={visibilityStyle.value}>
          <div class='progress-body' />
        </div>
      </div>
    )
  }
})

export {
  LctProgressLinear
}
