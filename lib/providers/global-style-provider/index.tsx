import { defineComponent, onBeforeUnmount, watch } from 'vue'
import { AppId } from '../../config/app-id'
import { LctColorScheme } from '../../config/color'
import { injectCssStyle, removeCssStyle, updateCssStyle } from '../../utils/style'
import { useAppConfig } from '../app-config-provider'

import colorSchemeTemplate from './global.color-scheme.styl'
import staticStyleTempalte from './global.static.styl'

let styleElementId = ''

const GlobalStyleProvider = defineComponent({
  name: 'GlobalStyleProvider',

  setup (props, { slots }) {
    const { appConfig } = useAppConfig()
    const colorSchemesNames = Object.values(LctColorScheme)

    const updateGlobalStyle = () => {
      const colorConfig = appConfig.value.colors
      let cssText = ''

      cssText += (staticStyleTempalte as string)
        .replace(/TEXT_COLOR/g, colorConfig.text.primary)
        .replace(/APP_ID/g, AppId)

      colorSchemesNames.forEach(scheme => {
        const backgroundColor = colorConfig.tonal[scheme] as string
        const textColor = colorConfig.text[scheme] as string
        cssText += (colorSchemeTemplate as string)
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

    watch(appConfig, () => {
      updateGlobalStyle()
    })

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
