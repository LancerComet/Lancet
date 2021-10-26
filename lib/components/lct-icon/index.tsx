import { computed, defineComponent, PropType } from 'vue'

import './index.styl'
import { isNumber } from '../../utils/type'

const ComponentName = 'LctIcon'

const LctIcon = defineComponent({
  name: ComponentName,

  props: {
    size: {
      type: [Number, String] as PropType<string | number>
    }
  },

  setup (props, { slots }) {
    const style = computed(() => {
      return {
        fontSize: isNumber(props.size)
          ? props.size + 'px'
          : props.size
      }
    })

    return () => (
      <span class='material-icons' style={style.value}>{slots.default?.()}</span>
    )
  }
})

export {
  LctIcon,
  ComponentName
}
