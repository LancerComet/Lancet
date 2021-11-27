import { readonly, ref } from 'vue'
import { createDefaultColorConfig, useAppConfig } from '../../lib'

const defaultColor = createDefaultColorConfig()
const colorSchemeList = ref([
  {
    tonal: defaultColor.tonal.primary,
    text: defaultColor.text.primary,
    label: '🌊 Ocean'
  },
  { tonal: '#fbdace', text: '#9e5750', label: '🌸 Sakura' },
  { tonal: '#b2ddc3', text: '#41716c', label: '🌳 Forest' },
  { tonal: '#ffb850', text: '#703F19', label: '🎃 Halloween' },
  { tonal: '#d0c8d7', text: '#5a5168', label: '🍆 Qiezi' },
  { tonal: '#a1e5d8', text: '#538f84', label: '🎤 Vocaloid' },
  { tonal: '#b4c8dc', text: '#3C3C50', label: '🚢 Navy' },
  { tonal: '#C8DCDC', text: '#769fab', label: '⛄ Winter' },
  { tonal: '#C8C8B4', text: '#141428', label: '🪖 Troops' }
])

const useCustomTheme = () => {
  const { appConfig, setAppConfig } = useAppConfig()

  const setAppTheme = (color: string, text: string) => {
    setAppConfig({
      ...appConfig.value,
      colors: {
        tonal: {
          ...appConfig.value.colors.tonal,
          primary: color
        },
        text: {
          ...appConfig.value.colors.text,
          primary: text
        }
      }
    })
  }

  const addTheme = (tonal: string, text: string, label: string) => {
    colorSchemeList.value.push({
      tonal, text, label
    })
  }

  const isCurrentColor = (tonal: string) => {
    return appConfig.value.colors.tonal.primary === tonal
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
