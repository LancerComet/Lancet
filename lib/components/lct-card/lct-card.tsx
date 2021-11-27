import { defineComponent, PropType } from 'vue'
import './lct-card.styl'

const LctCard = defineComponent({
  name: 'LctCard',

  props: {
    elevated: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    withMargin: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    onMouseEnter: {
      type: Function as PropType<(event: Event) => void>
    },

    onMouseLeave: {
      type: Function as PropType<(event: Event) => void>
    },

    radius: {
      type: Number as PropType<number>,
      default: 12
    },

    overHidden: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    role: {
      type: String as PropType<string>
    }
  },

  emits: ['mouseEnter', 'mouseLeave'],

  setup (props, { slots, emit }) {
    const onMouseEnter = (event: Event) => {
      emit('mouseEnter', event)
    }

    const onMouseLeave = (event: Event) => {
      emit('mouseLeave', event)
    }

    return () => (
      <div
        class={[
          'lct-card',
          props.elevated ? 'elevated' : null,
          props.withMargin ? 'with-margin' : null,
          props.overHidden ? 'over-hidden' : null
        ]}
        style={{
          borderRadius: props.radius + 'px'
        }}
        onMouseenter={onMouseEnter}
        onMouseleave={onMouseLeave}
        role={props.role}
      >{ slots.default?.() }</div>
    )
  }
})

export {
  LctCard
}
