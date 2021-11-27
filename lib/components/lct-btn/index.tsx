import { computed, defineComponent, PropType, toRefs } from 'vue'

import { LctColorScheme } from '../../config/color'
import { Ripple } from '../../directives/ripple'
import { useAppConfig } from '../../providers/app-config-provider'
import { isNumber } from '../../utils/type'
import { LctProgressCircular } from '../lct-progress-circular'
import { updateDynamicStyle } from './style'

import './style.general.styl'

const LctBtn = defineComponent({
  name: 'LctBtn',

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
      type: String as PropType<LctColorScheme>,
      default: LctColorScheme.Primary
    },

    text: {
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
    },

    elevated: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    circle: {
      type: Number as PropType<number>,
      default: 0
    },

    filled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    textAlign: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'center'
    }
  },

  emits: ['click'],

  setup (props, { slots, emit }) {
    const { outlined, color, width, height, minWidth, maxWidth } = toRefs(props)
    const { appConfig } = useAppConfig()

    const cssValueFilter = (value: string | number | undefined): string | undefined => {
      return isNumber(value)
        ? value + 'px'
        : value
    }

    const style = computed(() => {
      const result: Partial<CSSStyleDeclaration> = {
        width: cssValueFilter(width.value),
        height: cssValueFilter(height.value),
        minWidth: cssValueFilter(minWidth.value),
        maxWidth: cssValueFilter(maxWidth.value)
      }

      if (isNumber(props.circle) && props.circle > 0) {
        result.width = cssValueFilter(props.circle)
        result.height = cssValueFilter(props.circle)
      }

      if (props.filled) {
        result.backgroundColor = appConfig.value.colors.text[props.color]
        result.color = '#fff'
      }

      return result
    })

    const onClick = (event: MouseEvent) => {
      emit('click', event)
    }

    const classList = computed(() => {
      const colorScheme = color.value
      const result: string[] = ['lct-button']

      if (props.text) {
        result.push(`text ${colorScheme}-text`)
      } else if (outlined.value) {
        result.push('outlined', `${colorScheme}-border`, `${colorScheme}-text`)
      } else if (!props.filled) {
        result.push(`${colorScheme}-background ${colorScheme}-text`)
      }

      props.elevated && result.push('elevated')

      if (isNumber(props.circle) && props.circle > 0) {
        result.push('circle')
      }

      return result
    })

    updateDynamicStyle()

    return () => (
      <button
        class={classList.value}
        style={style.value as any}
        type={props.type} disabled={props.disabled}
        onClick={onClick} title={props.title}
        v-ripple
      >
        <div
          class='content-container'
          style={{
            justifyContent: props.textAlign === 'left'
              ? 'flex-start'
              : props.textAlign === 'right'
                ? 'flex-end'
                : 'center'
          }}
        >{
          props.loading
            ? <LctProgressCircular size='20px'/>
            : slots.default?.()
        }</div>
      </button>
    )
  }
})

export {
  LctBtn
}
