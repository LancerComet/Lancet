import { computed, defineComponent, PropType } from 'vue'
import { isNumber } from '../../../utils/type'

const ComponentName = 'LctTh'

const LctTh = defineComponent({
  name: ComponentName,

  props: {
    width: {
      type: [Number, String] as PropType<number | string | undefined>
    },

    textAlign: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'center'
    }
  },

  setup (props, { slots }) {
    const thStyle = computed(() => {
      return [{
        width: isNumber(props.width)
          ? props.width + 'px'
          : props.width
      }, {
        'text-align': props.textAlign
      }]
    })
    return () => (
      <th style={thStyle.value} >{ slots.default?.()}</th>
    )
  }
})

export {
  LctTh,
  ComponentName
}
