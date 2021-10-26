import { computed, defineComponent, PropType, toRefs } from 'vue'

import { LancetColorScheme } from '../../config/color'
import { Ripple } from '../../directives/ripple'
import { isEqual } from '../../utils/equal'
import { preventKeys } from '../../utils/event'
import { isKeyEnterOrSpace } from '../../utils/inputs'
import { isString } from '../../utils/type'
import {
  ComponentName as ComponentNameRadioGroup,
  LctRadioGroup, useRadioGroup
} from '../lct-radio-group'

import './index.styl'

const ComponentName = 'LctRadio'
const errorHint = () => {
  console.error(`[${ComponentName}] ${ComponentName} must be placed under ${ComponentNameRadioGroup}`)
}

const LctRadio = defineComponent({
  name: ComponentName,

  directives: {
    ripple: Ripple
  },

  props: {
    value: {
      type: [Number, String, Boolean, Object] as PropType<unknown>
    },

    label: {
      type: String as PropType<string>,
      default: ''
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: LancetColorScheme.Primary
    }
  },

  setup (props) {
    const { radioGroup, emitSelection } = useRadioGroup()
    if (!radioGroup) {
      errorHint()
      return () => null
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { modelValue, disabled } = toRefs<InstanceType<typeof LctRadioGroup>>(radioGroup.props as any)
    const isChecked = computed(() => isEqual(props.value, modelValue.value))
    const isDisabled = computed(() => disabled.value === true)
    const doSelect = () => emitSelection?.(props.value)
    const onUserSelect = () => doSelect()
    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key
      if (isKeyEnterOrSpace(key)) {
        doSelect()
      }
    }

    return () => (
      <label class='lct-radio'>
        <div
          class={[
            'radio-style',
            `${props.color}-text`,
            isChecked.value ? `${props.color}-border` : null,
            isChecked.value ? 'selected' : null
          ]}
          tabindex='0'
          onKeydown={preventKeys(' ', 'Enter')} onKeyup={onKeyUp}
          role='radio' aria-checked={isChecked.value}
        >
          <div class='ripple-slot' v-ripple/>
          <div class={[
            'radio-hinter',
            isChecked.value ? `${props.color}-background` : null
          ]}/>
        </div>
        <input
          class='radio-input'
          type="radio" disabled={isDisabled.value}
          value={props.value} onInput={onUserSelect}
          checked={isChecked.value}
        />
        {isString(props.label) ? <span class='label-text'>{props.label}</span> : null}
      </label>
    )
  }
})

export {
  LctRadio,
  ComponentName
}
