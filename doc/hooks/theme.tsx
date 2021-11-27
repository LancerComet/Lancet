import { readonly, ref } from 'vue'
import { createDefaultColorConfig, useAppConfig } from '../../lib'

const defaultColor = createDefaultColorConfig()
const colorSchemeList = ref([
  {
    color: defaultColor.color.primary,
    text: defaultColor.text.primary,
    label: '🌊 Ocean'
  },
  { color: '#fbdace', text: '#9e5750', label: '🌸 Sakura' },
  { color: '#b2ddc3', text: '#41716c', label: '🌳 Forest' },
  { color: '#ffeacb', text: '#ef9e5f', label: '🎃 Halloween' },
  { color: '#d0c8d7', text: '#5a5168', label: '🍆 Nasu' },
  { color: '#a1e5d8', text: '#538f84', label: '🎤 Vocaloid' }
])

const useCustomTheme = () => {
  const { appConfig, setAppConfig } = useAppConfig()

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

  const addTheme = (color: string, text: string, label: string) => {
    colorSchemeList.value.push({
      color, text, label
    })
  }

  const isCurrentColor = (color: string) => {
    return appConfig.value.colors.color.primary === color
  }

  return {
    colorSchemeList: readonly(colorSchemeList),
    setAppTheme,
    isCurrentColor,
    addTheme
  }
}

export {
  useCustomTheme
}
