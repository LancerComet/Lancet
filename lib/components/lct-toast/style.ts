import { AppId } from '../../config/app-id'
import { LctColorConfig, LctColorScheme } from '../../config/color'
import { useAppConfig } from '../../providers/app-config-provider'
import { injectCssStyle, updateCssStyle } from '../../utils/style'

let styleElementId = ''

function updateDynamicStyle () {
  const { appConfig } = useAppConfig()
  const colorSchemes = Object.values(LctColorScheme)
  const colorValue = appConfig.value.colors as LctColorConfig

  let cssText = ''
  colorSchemes.forEach(scheme => {
    const color = colorValue.tonal[scheme] as string
    const text = colorValue.text[scheme] as string

    cssText += `
      .${AppId} .lct-toast.color-${scheme} {
        background-color: ${color};
        border-color: ${color};
        color: ${text};
      }
    `.trim()
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
