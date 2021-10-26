import { computed, defineComponent, PropType } from 'vue'

import { LancetColorScheme } from '../../config/color'
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
    const isActivated = computed(() => {
      return props.modelValue === props.trueValue
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
          isActivated.value ? (isString(props.color) ? `${props.color}-background` : null) : null,
          props.disabled ? 'disabled' : null
        ]}
        onClick={toggleSelect}
      >
        <div class={['switch-handler', isActivated.value ? 'activated' : null]}>{
          props.loading
            ? <LctProgressCircular class='loading-indicator' size={15} color={props.color}/>
            : null
        }</div>
      </div>
    )
  }
})

export {
  LctSwitcher
}
