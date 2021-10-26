import { AppId } from '../../config/app-id'
import { LancetColorConfig, LancetColorScheme } from '../../config/color'
import { useAppConfig } from '../../providers/app-config-provider'
import { darken, lighten } from '../../utils/color'
import { injectCssStyle, updateCssStyle } from '../../utils/style'

import dynamicCssTemplate from './style.dynamic.styl'

let styleElementId = ''

function updateDynamicStyle () {
  const appConfig = useAppConfig()
  const colorSchemes = Object.values(LancetColorScheme)
  const colorValue = appConfig.value.colors as LancetColorConfig

  let cssText = ''
  colorSchemes.forEach(scheme => {
    const color = colorValue[scheme] as string
    cssText += (dynamicCssTemplate as string)
      .replace(/COLOR_SCHEME/g, scheme)
      .replace(/HOVER_COLOR/g, lighten(color, 0.1))
      .replace(/ACTIVE_COLOR/g, darken(color, 0.1))
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
