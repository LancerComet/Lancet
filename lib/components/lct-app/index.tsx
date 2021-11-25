import { defineComponent, PropType } from 'vue'

import { LancetAppConfig } from '../../config/app-config'
import { AppId } from '../../config/app-id'
import { AppConfigProvider } from '../../providers/app-config-provider'
import { LctDialogProvider } from '../../providers/dialog-provider'
import { GlobalStyleProvider } from '../../providers/global-style-provider'
import { OutsideSlotProvider } from '../../providers/outside-slot-provider'
import { LctToastProvider } from '../../providers/toast-provider'

/**
 * LctApp must be placed as root component in order to use Lancet.
 */
const LctApp = defineComponent({
  name: 'LctApp',

  props: {
    config: {
      type: Object as PropType<Partial<LancetAppConfig>>
    }
  },

  setup (props, { slots }) {
    return () => (
      <div id={AppId}>
        <AppConfigProvider config={props.config}>
          <GlobalStyleProvider>
            <OutsideSlotProvider>
              <LctToastProvider>
                <LctDialogProvider>{slots.default?.()}</LctDialogProvider>
              </LctToastProvider>
            </OutsideSlotProvider>
          </GlobalStyleProvider>
        </AppConfigProvider>
      </div>
    )
  }
})

export {
  LctApp
}
