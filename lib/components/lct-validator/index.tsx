import { defineComponent, onBeforeUnmount, PropType, toRef, Transition } from 'vue'
import { useRules } from '../../hooks/use-rules'
import { Rule } from '../../utils/validator'
import { LctInput } from '../lct-input'

const ComponentName = 'LctValidator'

const LctValidator = defineComponent({
  name: ComponentName,

  props: {
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | unknown[]>,
      default: ''
    },

    rules: {
      type: Array as PropType<Rule[]>,
      default: () => []
    },

    required: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup (props) {
    const modelValue = toRef(props, 'modelValue')
    const { errorMessage, unregister } = useRules(modelValue, props.rules)

    const slots = {
      message: () => (
        <Transition enterActiveClass='entry-animation' leaveActiveClass='leave-animation'>{
          errorMessage.value
            ? <div class='error-text'>{errorMessage.value}</div>
            : null
        }</Transition>
      )
    }

    onBeforeUnmount(() => {
      unregister()
    })

    return () => (
      <LctInput
        class='lct-validator'
        v-slots={slots}
        required={props.required}
        value={props.modelValue}
      />
    )
  }
})

export {
  LctValidator,
  ComponentName
}
