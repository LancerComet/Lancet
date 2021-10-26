import { computed, defineComponent, PropType } from 'vue'
import { isEmptyString, isNumber, isUndefined } from '../../utils/type'
import './index.styl'

const ComponentName = 'LctCard'

const LctCard = defineComponent({
  name: ComponentName,

  props: {
    title: {
      type: String as PropType<string>
    },

    elevated: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    padding: {
      type: [Number, String] as PropType<number | string>
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
    }
  },

  emits: ['mouseEnter', 'mouseLeave'],

  setup (props, { slots, emit }) {
    const hasTitleOrButton = computed<boolean>(() => {
      return !isEmptyString(props.title) || !isUndefined(slots.button?.())
    })

    const createTitleSection = () => (
      <div class='card-title'>
        <span>{ !isEmptyString(props.title) ? props.title : ' ' }</span>
        { slots.button?.() }
      </div>
    )

    const contentStyle = computed(() => {
      return {
        padding: isNumber(props.padding)
          ? props.padding + 'px'
          : props.padding
      }
    })

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
          props.withMargin ? 'with-margin' : null
        ]}
        onMouseenter={onMouseEnter}
        onMouseleave={onMouseLeave}
      >
        { hasTitleOrButton.value ? createTitleSection() : null }
        <div class='card-content' style={contentStyle.value}>{ slots.default?.() }</div>
      </div>
    )
  }
})

export {
  LctCard
}
