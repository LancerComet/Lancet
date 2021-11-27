import { defineComponent, PropType } from 'vue'
import { LctIcon } from '../lct-icon'

const LctListItem = defineComponent({
  name: 'LctListItem',

  props: {
    icon: {
      type: String as PropType<string>
    },
    text: {
      type: String as PropType<string>
    },
    onClick: {
      type: Function as PropType<(event: Event) => void>
    }
  },

  emits: ['click'],

  setup (props, { slots, emit }) {
    const onClick = (event: Event) => {
      emit('click', event)
    }

    return () => (
      <div role='listitem' onClick={onClick}>{
        slots.default?.()
      }</div>
    )
  }
})

export {
  LctListItem
}
