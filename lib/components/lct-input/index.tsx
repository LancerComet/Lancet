import { defineComponent, PropType } from 'vue'

import { isEmptyString } from '../../utils/type'
import { RequiredInput } from '../_required-input'
import { LctIcon } from '../lct-icon'

import './index.styl'

const LctInput = defineComponent({
  name: 'LctInput',

  props: {
    icon: {
      type: String as PropType<string>
    },

    role: {
      type: String as PropType<string>
    },

    label: {
      type: String as PropType<string>
    },

    /**
     * 此表单组件是否为必填项.
     */
    required: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    /**
     * 当 required 设置为 true 时候, 请配套传入此 prop 以便校验用户是否真的填入内容.
     *
     * @default undefined
     */
    value: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<unknown>
    }
  },

  setup (props, { slots }) {
    return () => (
      <div class='lct-input' role={props.role}>
        <div class='input-aside'>
          { props.required ? <span class='required-mark error-text'>*</span> : null }
          { props.icon ? <LctIcon class='input-icon'>{props.icon}</LctIcon> : null }
          {
            isEmptyString(props.label)
              ? null
              : <div class='input-label'>{ props.label }</div>
          }
        </div>
        <div class='input-body'>
          { props.required ? <RequiredInput value={props.value} /> : null }
          <div class='input-slot'>{slots.default?.()}</div>
          <div class='input-message'>{slots.message?.()}</div>
        </div>
      </div>
    )
  }
})

export {
  LctInput
}
