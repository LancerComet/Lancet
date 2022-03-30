import { computed, defineComponent, PropType } from 'vue'
import { isNumber } from '../../utils/type'

import './lct-card-content.styl'

const LctCardContent = defineComponent({
  name: 'LctCardContent',

  props: {
    padding: {
      type: [Number, String] as PropType<number | string>,
      default: 30
    }
  },

  setup (props, { slots }) {
    const contentStyle = computed(() => {
      return {
        padding: isNumber(props.padding)
          ? props.padding + 'px'
          : props.padding
      }
    })

    return () => (
      <div class='lct-card-content' style={contentStyle.value}>{ slots.default?.() }</div>
    )
  }
})

export {
  LctCardContent
}
