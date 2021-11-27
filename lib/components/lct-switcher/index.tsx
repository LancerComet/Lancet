import { computed, defineComponent, PropType } from 'vue'

import { LctColorScheme } from '../../config/color'
import { useAppConfig } from '../../providers/app-config-provider'
import { isString } from '../../utils/type'
import { LctProgressCircular } from '../lct-progress-circular'

import './index.styl'

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
      type: String as PropType<LctColorScheme>,
      default: LctColorScheme.Primary
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
    const { appConfig } = useAppConfig()

    const isActivated = computed(() => {
      return props.modelValue === props.trueValue
    })

    const backgroundClassName = computed(() => {
      return isString(props.color) ? `${props.color}-background` : undefined
    })

    const handleStyle = computed(() => {
      return {
        backgroundColor: isActivated.value
          ? appConfig.value.colors.tonal[props.color]
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
                  tonal: isActivated.value
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
