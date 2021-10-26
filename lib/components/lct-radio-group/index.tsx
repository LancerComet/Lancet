import {
  ComponentInternalInstance, defineComponent,
  getCurrentInstance, inject, onBeforeUnmount, PropType, provide, toRef, Transition
} from 'vue'
import { useRules } from '../../hooks/use-rules'
import { randomString } from '../../utils/random'
import { LctInput } from '../lct-input'
import './index.styl'
import { Rule } from '../../utils/validator'

const ComponentName = 'LctRadioGroup'
const emitSelectionName = randomString(10)
const radioGroupInstanceKey = randomString(10)

type RadioGroupValueType = unknown

const LctRadioGroup = defineComponent({
  name: ComponentName,

  props: {
    modelValue: {
      type: [String, Number, Boolean, Object] as PropType<RadioGroupValueType>,
      default: null
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    icon: {
      type: String as PropType<string>
    },

    label: {
      type: String as PropType<string>
    },

    required: {
      type: Boolean as PropType<boolean>
    },

    rules: {
      type: Array as PropType<Rule[]>,
      default: () => []
    }
  },

  emits: ['update:modelValue'],

  setup (props, { slots, emit }) {
    const emitSelection = (value: RadioGroupValueType) => {
      emit('update:modelValue', value)
    }
    provide(emitSelectionName, emitSelection)

    const instance = getCurrentInstance()
    provide(radioGroupInstanceKey, instance)

    const { errorMessage, unregister } = useRules(
      toRef(props, 'modelValue'),
      props.rules
    )

    onBeforeUnmount(() => {
      unregister()
    })

    return () => (
      <LctInput
        class={[
          'lct-radio-group',
          props.disabled === true ? 'disabled' : null
        ]}
        icon={props.icon} role='radiogroup'
        label={props.label}
        required={props.required} value={props.modelValue}
        v-slots={{
          default: () => slots.default?.(),
          message: () => (
            <Transition enterActiveClass='entry-animation' leaveActiveClass='leave-animation'>{
              errorMessage.value
                ? <div class='error-text'>{errorMessage.value}</div>
                : null
            }</Transition>
          )
        }}
      />
    )
  }
})

const useRadioGroup = () => {
  const radioGroup = inject<ComponentInternalInstance>(radioGroupInstanceKey)
  const emitSelection = inject<(value: RadioGroupValueType | null | undefined) => void>(emitSelectionName)
  return {
    radioGroup,
    emitSelection
  }
}

export {
  LctRadioGroup,
  ComponentName,
  useRadioGroup,
  RadioGroupValueType
}
