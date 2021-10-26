import { AppId } from '../../config/app-id'
import { LancetColorConfig, LancetColorScheme } from '../../config/color'
import { useAppConfig } from '../../providers/app-config-provider'
import { injectCssStyle, updateCssStyle } from '../../utils/style'

let styleElementId = ''

function updateDynamicStyle () {
  const appConfig = useAppConfig()
  const colorSchemes = Object.values(LancetColorScheme)
  const colorValue = appConfig.value.colors as LancetColorConfig

  let cssText = ''
  colorSchemes.forEach(scheme => {
    const color = colorValue[scheme] as string
    cssText += `
      #${AppId} .lct-toast.color-${scheme} {
        background-color: ${color};
        border-color: ${color};
      }
    `
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
