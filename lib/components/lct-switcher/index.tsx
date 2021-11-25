import { computed, defineComponent, PropType } from 'vue'

import { LancetColorScheme } from '../../config/color'
import { isString } from '../../utils/type'
import { LctProgressCircular } from '../lct-progress-circular'

import './index.styl'
import { useAppConfig } from '../../providers/app-config-provider'

const LctSwitcher = defineComponent({
  props: {
    modelValue: {
      default: false
    },

    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: LancetColorScheme.Primary
    },

    trueValue: {
      type: null,
      default: true
    },

    falseValue: {
      type: null,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const appConfig = useAppConfig()

    const isActivated = computed(() => {
      return props.modelValue === props.trueValue
    })

    const backgroundClassName = computed(() => {
      return isString(props.color) ? `${props.color}-background` : undefined
    })

    const handleStyle = computed(() => {
      return {
        backgroundColor: isActivated.value
          ? appConfig.value.colors.text[props.color]
          : undefined
      }
    })

    const toggleSelect = () => {
      if (props.disabled) {
        return
      }
      const newValue = isActivated.value
        ? props.falseValue
        : props.trueValue
      emit('update:modelValue', newValue)
    }

    return () => (
      <div
        class={[
          'lct-switcher',
          isActivated.value ? backgroundClassName.value : null,
          props.disabled ? 'disabled' : null
        ]}
        onClick={toggleSelect}
      >
        <div
          class={['switch-handle', isActivated.value ? 'activated' : null]}
          style={handleStyle.value}
        >{
          props.loading
            ? <LctProgressCircular
                class='loading-indicator'
                style={{
                  color: isActivated.value
                    ? '#ffffff'
                    : appConfig.value.colors.text[props.color]
                }}
                size={18}
              />
            : null
        }</div>
      </div>
    )
  }
})

export {
  LctSwitcher
}
