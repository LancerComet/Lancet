import { AppId } from '../../config/app-id'
import { LctColorConfig, LctColorScheme } from '../../config/color'
import { useAppConfig } from '../../providers/app-config-provider'
import { darken, lighten } from '../../utils/color'
import { injectCssStyle, updateCssStyle } from '../../utils/style'

import dynamicCssTemplate from './style.dynamic.styl'

let styleElementId = ''

function updateDynamicStyle () {
  const { appConfig } = useAppConfig()
  const colorSchemes = Object.values(LctColorScheme)
  const colorValue = appConfig.value.colors as LctColorConfig

  let cssText = ''
  colorSchemes.forEach(scheme => {
    const backgroundColor = colorValue.tonal[scheme] as string
    const textColor = colorValue.text[scheme] as string

    cssText += (dynamicCssTemplate as string)
      .replace(/COLOR_SCHEME/g, scheme)
      .replace(/HOVER_TEXT_COLOR/g, lighten(backgroundColor, 0.1))
      .replace(/HOVER_BACKGROUND_COLOR/g, darken(textColor, 0.1))
      .replace(/ACTIVE_TEXT_COLOR/g, darken(textColor, 0.1))
      .replace(/APP_ID/g, AppId)
  })

  if (!styleElementId) {
    styleElementId = injectCssStyle(cssText)
  } else {
    updateCssStyle(styleElementId, cssText)
  }
}

export {
  updateDynamicStyle
}
