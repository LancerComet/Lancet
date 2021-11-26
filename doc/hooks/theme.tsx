import { useAppConfig } from '../../lib'

const useCustomTheme = () => {
  const { appConfig, setAppConfig } = useAppConfig()
  const colorSchemeList = [
    {
      color: appConfig.value.colors.color.primary,
      text: appConfig.value.colors.text.primary,
      label: '🌊'
    },
    { color: '#fbdace', text: '#795548', label: '🌸' },
    { color: '#b2ddc3', text: '#879d9b', label: '🌳' },
    { color: '#ffeacb', text: '#ff9800', label: '🍊' }
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
