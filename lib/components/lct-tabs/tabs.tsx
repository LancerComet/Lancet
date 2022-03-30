import { defineComponent, inject, PropType, provide, Ref, ref, toRefs } from 'vue'
import { LctColorScheme } from '../../config/color'
import { randomString } from '../../utils/random'
import { ComponentName as TabComponentName } from './tab'

import './index.styl'

const ComponentName = 'LctTabs'
const EmitTabsProvideKey = 'tabs_' + randomString()

type TabNameType = string | number | undefined

interface ITab {
  modelValue: Ref<TabNameType>
  color: Ref<LctColorScheme>
  emitActivateTab: (tabName: TabNameType) => void
}

const LctTabs = defineComponent({
  name: ComponentName,

  props: {
    color: {
      type: String as PropType<LctColorScheme>,
      default: LctColorScheme.Primary
    },

    modelValue: {
      type: [String, Number] as PropType<TabNameType>
    }
  },

  emits: ['update:modelValue'],

  setup (props, { slots, emit }) {
    const { modelValue, color } = toRefs(props)
    const emitActivateTab = (newValue: unknown) => {
      emit('update:modelValue', newValue)
    }
    provide(EmitTabsProvideKey, {
      modelValue,
      color,
      emitActivateTab
    } as ITab)

    return () => (
      <div class={'lct-tabs'} >{ slots.default?.() }</div>
    )
  }
})

const _useTabs = (): ITab => {
  return inject<ITab>(
    EmitTabsProvideKey,
    {
      modelValue: ref<TabNameType>(),
      color: ref<LctColorScheme>(LctColorScheme.Primary),
      emitActivateTab: () => {
        console.warn(`${TabComponentName} must be located under ${ComponentName}.`)
      }
    }
  )
}

export {
  LctTabs,
  _useTabs,
  TabNameType
}
