import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref, toRef, Transition, unref } from 'vue'
import { useRules } from '../../hooks/use-rules'
import { isNumber, isUnEmptyString } from '../../utils/type'
import { LctInput } from '../lct-input'
import './index.styl'
import { Rule } from '../../utils/validator'

const ComponentName = 'LctTextfield'

const LctTextfield = defineComponent({
  name: ComponentName,

  props: {
    label: {
      type: String as PropType<string>,
      default: ''
    },
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    type: {
      type: String as PropType<string>,
      default: 'text'
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    maxlength: {
      type: [Number, String] as PropType<number | string | undefined>
    },
    width: {
      type: [Number, String] as PropType<number | string | undefined>
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    },
    rules: {
      type: Array as PropType<Rule[]>,
      default: () => []
    },
    hint: {
      type: String as PropType<string>,
      default: ''
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    icon: {
      type: String as PropType<string>
    },
    onInput: {
      type: Function as PropType<(event: InputEvent) => void>
    },
    onBlur: {
      type: Function as PropType<(event: Event) => void>
    },
    onFocus: {
      type: Function as PropType<(event: Event) => void>
    },
    onKeyup: {
      type: Function as PropType<(event: KeyboardEvent) => void>
    }
  },

  emits: ['update:modelValue', 'input', 'blur', 'focus', 'keyup'],

  setup (props, { emit }) {
    let isImeStart = false
    const inputType = props.type
    const input = ref<HTMLInputElement>()
    const { errorMessage, validate, unregister } = useRules(
      toRef(props, 'modelValue'),
      props.rules
    )

    const onCompositionstart = () => {
      isImeStart = true
    }

    const onCompositionend = () => {
      const newValue = input.value?.value ?? ''
      emitValue(newValue)
      isImeStart = false
    }

    const onInput = (event: Event) => {
      if (isImeStart) {
        return
      }
      const target = event.target as HTMLInputElement
      const newValue = target.value ?? ''
      emitValue(newValue)
      emit('input', event)
    }

    const onBlur = (event: Event) => {
      emit('blur', event)
      validate()
    }

    const emitValue = (newValue: string) => {
      emit(
        'update:modelValue',
        inputType === 'number'
          ? parseInt(newValue, 10)
          : newValue
      )
    }

    const onFocus = (event: Event) => {
      emit('focus', event)
    }

    const onKeyup = (event: KeyboardEvent) => {
      emit('keyup', event)
    }

    const setDefaultValue = () => {
      const value = props.modelValue.toString()
      const inputElement = unref(input)
      if (inputElement) {
        inputElement.value = value
      }
    }

    const inputStyle = computed(() => {
      return {
        width: isNumber(props.width)
          ? `${props.width}px`
          : isUnEmptyString(props.width)
            ? props.width
            : undefined
      }
    })

    onMounted(() => {
      setDefaultValue()
    })

    onBeforeUnmount(() => {
      unregister()
    })

    const slots = {
      default: () => (
        <input
          ref={input}
          class='textfield-input' style={inputStyle.value}
          type={props.type} disabled={props.disabled} maxlength={props.maxlength}
          value={props.modelValue}
          onInput={onInput} onBlur={onBlur} onFocus={onFocus} onKeyup={onKeyup}
          placeholder={props.placeholder}
          onCompositionstart={onCompositionstart}
          onCompositionend={onCompositionend}
          readonly={props.readonly}
        />
      ),
      message: () => (
        <Transition enterActiveClass='entry-animation' leaveActiveClass='leave-animation'>{
          errorMessage.value
            ? <div class='error-text'>{errorMessage.value}</div>
            : props.hint
        }</Transition>
      )
    }

    return () => (
      <LctInput
        class='lct-textfield'
        icon={props.icon} label={props.label}
        v-slots={slots}
        required={props.required} value={props.modelValue}
      />
    )
  }
})

export {
  LctTextfield,
  ComponentName
}
