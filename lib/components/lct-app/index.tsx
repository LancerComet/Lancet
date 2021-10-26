import { defineComponent, PropType } from 'vue'

import { createDefaultConfig, LancetAppConfig } from '../../config/app-config'
import { AppId } from '../../config/app-id'
import { AppConfigProvider } from '../../providers/app-config-provider'
import { LctDialogProvider } from '../../providers/dialog-provider'
import { GlobalStyleProvider } from '../../providers/global-style-provider'
import { OutsideSlotProvider } from '../../providers/outside-slot-provider'
import { LctToastProvider } from '../../providers/toast-provider'

const BuiltInProviders = defineComponent({
  name: 'BuildInProviders',
  props: {
    config: {
      type: Object as PropType<Partial<LancetAppConfig>>,
      default: createDefaultConfig()
    }
  },

  setup (props, { slots }) {
    return () => (
      <AppConfigProvider config={props.config}>
        <GlobalStyleProvider>
          <OutsideSlotProvider>
            <LctToastProvider>
              <LctDialogProvider>{slots.default?.()}</LctDialogProvider>
            </LctToastProvider>
          </OutsideSlotProvider>
        </GlobalStyleProvider>
      </AppConfigProvider>
    )
  }
})

/**
 * LctApp 是项目的根组件.
 * 用于为框架提供特殊功能.
 */
const LctApp = defineComponent({
  name: 'LctApp',

  props: {
    config: {
      type: Object as PropType<Partial<LancetAppConfig>>,
      default: createDefaultConfig()
    }
  },

  setup (props, { slots }) {
    return () => (
      <div id={AppId}>
        <BuiltInProviders config={props.config}>{slots.default?.()}</BuiltInProviders>
      </div>
    )
  }
})

export {
  LctApp
}
