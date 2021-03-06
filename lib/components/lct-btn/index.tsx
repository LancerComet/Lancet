import { computed, defineComponent, PropType, toRefs } from 'vue'

import { LancetColorScheme } from '../../config/color'
import { Ripple } from '../../directives/ripple'
import { isNumber } from '../../utils/type'
import { LctProgressCircular } from '../lct-progress-circular'
import { updateDynamicStyle } from './style'

import './style.general.styl'

const ComponentName = 'LctBtn'

const LctBtn = defineComponent({
  name: ComponentName,

  directives: {
    ripple: Ripple
  },

  props: {
    width: {
      type: [Number, String] as PropType<number | string>
    },

    height: {
      type: [Number, String] as PropType<number | string>
    },

    minWidth: {
      type: [Number, String] as PropType<number | string>
    },

    maxWidth: {
      type: [Number, String] as PropType<number | string>
    },

    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    },

    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    outlined: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: LancetColorScheme.Primary
    },

    transparent: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    title: {
      type: String as PropType<string>,
      default: ''
    }
  },

  emits: ['click'],

  setup (props, { slots, emit }) {
    const { outlined, color, width, height, minWidth, maxWidth } = toRefs(props)

    const cssValueFilter = (value: string | number | undefined): string | undefined => {
      return isNumber(value)
        ? value + 'px'
        : value
    }

    const style = computed(() => {
      return {
        width: cssValueFilter(width.value),
        height: cssValueFilter(height.value),
        minWidth: cssValueFilter(minWidth.value),
        maxWidth: cssValueFilter(maxWidth.value)
      }
    })

    const onClick = (event: MouseEvent) => {
      emit('click', event)
    }

    const classList = computed(() => {
      const colorScheme = color.value
      const result: string[] = ['lct-button']

      if (props.transparent) {
        result.push('transparent')
      } else {
        result.push(`color-${colorScheme}`)
        if (outlined.value) {
          result.push('outlined', `${colorScheme}-border`, `${colorScheme}-text`)
        } else {
          result.push(`${colorScheme}-background`)
        }
      }
      return result
    })

    updateDynamicStyle()

    return () => (
      <button
        class={classList.value}
        style={style.value}
        type={props.type} disabled={props.disabled}
        onClick={onClick} title={props.title}
        v-ripple
      >
        <div class='content-container'>{
          props.loading
            ? <LctProgressCircular size='20px'/>
            : slots.default?.()
        }</div>
      </button>
    )
  }
})

export {
  LctBtn,
  ComponentName
}
