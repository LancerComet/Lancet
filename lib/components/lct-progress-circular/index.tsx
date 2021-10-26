import { computed, defineComponent, PropType } from 'vue'

import { LancetColorScheme } from '../../config/color'
import { isNumber, isString } from '../../utils/type'

import './index.styl'

const LctProgressCircular = defineComponent({
  name: 'LctProgressCircular',

  props: {
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 24
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: null
    }
  },

  setup (props) {
    const style = computed(() => {
      return {
        width: isNumber(props.size)
          ? props.size + 'px'
          : props.size
      }
    })

    return () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class={[
          'lct-progress-circular',
          isString(props.color) ? `${props.color}-text` : null
        ]}
        viewBox="22.8 22.8 45.7 45.7"
        style={style.value}
      >
        <circle
          class="circular-overlay"
          fill="transparent"
          cx="45.7" cy="45.7" r="20" stroke-width="5.7" stroke-dasharray="125.6"
          stroke-dashoffset="125.6"
        />
      </svg>
    )
  }
})

export {
  LctProgressCircular
}
