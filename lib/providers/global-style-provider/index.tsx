import { computed, defineComponent, onBeforeUnmount } from 'vue'
import { AppId } from '../../config/app-id'
import { createDefaultColorConfig, LancetColorConfig, LancetColorScheme } from '../../config/color'
import { injectCssStyle, removeCssStyle, updateCssStyle } from '../../utils/style'
import { useAppConfig } from '../app-config-provider'

import styleTemplate from './index.styl'

let styleElementId = ''

const GlobalStyleProvider = defineComponent({
  name: 'GlobalStyleProvider',

  setup (props, { slots }) {
    const config = useAppConfig()
    const colorSchemes = Object.values(LancetColorScheme)
    const colorValue = computed<LancetColorConfig>(() => {
      return {
        ...createDefaultColorConfig(),
        ...config.value.colors
      } as LancetColorConfig
    })

    const updateGlobalStyle = () => {
      let cssText = ''
      colorSchemes.forEach(scheme => {
        const color = colorValue.value[scheme] as string
        cssText += (styleTemplate as string)
          .replace(/THEME_SCHEME/g, scheme)
          .replace(/COLOR_VALUE/g, color)
          .replace(/APP_ID/g, AppId)
      })

      if (!styleElementId) {
        styleElementId = injectCssStyle(cssText)
      } else {
        updateCssStyle(styleElementId, cssText)
      }
    }

    updateGlobalStyle()

    onBeforeUnmount(() => {
      removeCssStyle(styleElementId)
    })

    return () => (
      <>{ slots.default?.() }</>
    )
  }
})

export {
  GlobalStyleProvider
}
