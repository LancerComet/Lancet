import { computed, defineComponent, PropType } from 'vue'
import { isNumber } from '../../utils/type'

const LctCardTitle = defineComponent({
  name: 'LctCardTitle',

  props: {
    padding: {
      type: [Number, String] as PropType<number | string>,
      default: '30px 30px 0 30px'
    }
  },

  setup (props, { slots }) {
    const titleStyle = computed(() => {
      return {
        padding: isNumber(props.padding)
          ? props.padding + 'px'
          : props.padding
      }
    })

    return () => (
      <div class='card-title' style={titleStyle.value}>{
        slots.default?.()
      }</div>
    )
  }
})

export {
  LctCardTitle
}
