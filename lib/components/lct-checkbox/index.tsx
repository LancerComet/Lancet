import { computed, defineComponent, PropType, toRefs, Transition } from 'vue'

import { LctColorScheme } from '../../config/color'
import { Ripple } from '../../directives/ripple'
import { isEqual } from '../../utils/equal'
import { isKeyEnterOrSpace } from '../../utils/inputs'
import { isArray, isUnEmptyString } from '../../utils/type'

import './index.styl'
import { useAppConfig } from '../../providers/app-config-provider'

const ComponentName = 'LctCheckbox'

const LctCheckbox = defineComponent({
  name: ComponentName,

  directives: {
    ripple: Ripple
  },

  props: {
    modelValue: {
      type: [Array, Boolean, String, Number, BigInt, Symbol, Function, Object] as PropType<unknown | unknown[]>
    },

    value: {
      type: [Array, Boolean, String, Number, BigInt, Symbol, Function, Object] as PropType<unknown>
    },

    label: {
      type: String as PropType<string>,
      default: ''
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    color: {
      type: String as PropType<LctColorScheme>,
      default: LctColorScheme.Primary
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const { appConfig } = useAppConfig()
    const { modelValue, value } = toRefs(props)

    const isChecked = computed(() => {
      return isArray(modelValue.value)
        ? (modelValue.value as unknown[]).filter(item => isEqual(item, value.value)).length > 0
        : isEqual(modelValue.value, value.value)
    })

    const emitValue = () => {
      const newCheckStatus = !isChecked.value
      let newValue: unknown
      if (isArray(modelValue.value)) {
        newValue = newCheckStatus
          ? [...new Set(modelValue.value).add(props.value)] // 添加元素
          : (modelValue.value as unknown[]).filter(x => x !== props.value) // 删除元素
      } else {
        newValue = newCheckStatus
          ? props.value
          : null
      }
      emit('update:modelValue', newValue)
    }

    const onInput = () => {
      emitValue()
    }

    const onKeyup = (event: KeyboardEvent) => {
      if (isKeyEnterOrSpace(event.key)) {
        emitValue()
      }
    }

    return () => (
      <label class='lct-checkbox'>
        <div
          class={['checkbox-style', `${props.color}-background`]}
          role='checkbox' aria-checked={isChecked.value}
          tabindex='0' onKeyup={onKeyup}
        >
          <Transition enterActiveClass='enter-animation' leaveActiveClass='leave-animation'>{
            isChecked.value
              ? <div class='checkbox-hinter' style={{ backgroundColor: appConfig.value.colors.text.primary }}>
                  <div class='check-icon'/>
                </div>
              : null
          }</Transition>
          <div class={['ripple-slot', `${props.color}-text`]} v-ripple/>
        </div>
        <input
          class='checkbox-input'
          type="checkbox"
          disabled={props.disabled}
          onInput={onInput} checked={isChecked.value}
        />
        {isUnEmptyString(props.label) ? <span class='label-text'>{props.label}</span> : null}
      </label>
    )
  }
})
export {
  LctCheckbox,
  ComponentName
}
