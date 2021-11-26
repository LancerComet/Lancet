import { createDefaultColorConfig, useAppConfig } from '../../lib'

const useCustomTheme = () => {
  const { appConfig, setAppConfig } = useAppConfig()
  const defaultColor = createDefaultColorConfig()
  const colorSchemeList = [
    {
      color: defaultColor.color.primary,
      text: defaultColor.text.primary,
      label: '🌊 Ocean'
    },
    { color: '#fbdace', text: '#9e5750', label: '🌸 Sakura' },
    { color: '#b2ddc3', text: '#41716c', label: '🌳 Forest' },
    { color: '#ffeacb', text: '#ef9e5f', label: '🎃 Halloween' },
    { color: '#d0c8d7', text: '#5a5168', label: '🍆 Eggplant' }
  ]

  const setAppTheme = (color: string, text: string) => {
    setAppConfig({
      ...appConfig.value,
      colors: {
        color: {
          ...appConfig.value.colors.color,
          primary: color
        },
        text: {
          ...appConfig.value.colors.text,
          primary: text
        }
      }
    })
  }

  const isCurrentColor = (color: string) => {
    return appConfig.value.colors.color.primary === color
  }

  return {
    colorSchemeList,
    setAppTheme,
    isCurrentColor
  }
}

export {
  useCustomTheme
}
