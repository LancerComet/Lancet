/**
 * Lancet is an UI components library based on Vue 3.
 *
 * @author LancerComet
 * @licence
 */

import { Plugin } from 'vue'
import { Ripple } from './directives/ripple'

export * from './components'

export type { LancetAppConfig } from './config/app-config'

export { LancetColorScheme, createDefaultColorConfig } from './config/color'
export type { LancetColorConfig } from './config/color'
export { LancetTheme, createDefaultTheme } from './config/theme'
export { useRules } from './hooks/use-rules'

export { useAppConfig } from './providers/app-config-provider'
export { useDialog } from './providers/dialog-provider'
export { useToast } from './providers/toast-provider'

const Lancet: Plugin = {
  install: (app) => {
    app.directive('ripple', Ripple)
  }
}

export {
  Lancet,
  Ripple
}
