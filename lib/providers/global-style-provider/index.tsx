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
    const appConfig = useAppConfig()
    const colorSchemes = Object.values(LancetColorScheme)
    const colorValue = computed<LancetColorConfig>(() => {
      return {
        ...createDefaultColorConfig(),
        ...appConfig.value.colors
      } as LancetColorConfig
    })

    const updateGlobalStyle = () => {
      let cssText = ''
      colorSchemes.forEach(scheme => {
        const backgroundColor = colorValue.value.color[scheme] as string
        const textColor = colorValue.value.text[scheme] as string
        cssText += (styleTemplate as string)
          .replace(/THEME_SCHEME/g, scheme)
          .replace(/BACKGROUND_COLOR/g, backgroundColor)
          .replace(/TEXT_COLOR/g, textColor)
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
