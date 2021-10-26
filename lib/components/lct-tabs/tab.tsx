import { computed, defineComponent, PropType } from 'vue'

import { isUndefined } from '../../utils/type'
import { TabNameType, _useTabs } from './tabs'

import './index.styl'

const ComponentName = 'LctTab'

const LctTab = defineComponent({
  name: ComponentName,

  props: {
    value: {
      type: [Array, Boolean, String, Number, BigInt, Symbol, Function, Object] as PropType<unknown>
    },

    label: {
      type: String as PropType<string>,
      default: null
    }
  },

  setup (props, { slots }) {
    const { modelValue, emitActivateTab, color } = _useTabs()

    const isActive = computed(() => {
      const res = !isUndefined(props.value)
        ? props.value
        : props.label
          ? props.label
          : slots.default?.name
      return modelValue.value === res
    })

    const onClickTab = () => {
      const res = !isUndefined(props.value)
        ? props.value
        : props.label
          ? props.label
          : slots.default?.name
      emitActivateTab(res as TabNameType)
    }

    return () => (
      <div
        class={
          isActive.value
            ? ['lct-tab', 'active', `${color.value}-text`, `${color.value}-border`]
            : ['lct-tab', 'deactivated']
        }
        onClick={onClickTab}
        v-ripple
      >
        { slots.default && <div>{slots.default?.()}</div> }
        { !slots.default && <div>{ props.label }</div> }
      </div>
    )
  }
})

export {
  LctTab,
  ComponentName
}
