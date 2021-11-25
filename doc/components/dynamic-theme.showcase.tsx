import { defineComponent } from 'vue'
import { LctBtn, LctCard, useAppConfig } from '../../lib'

const DynamicThemeShowcase = defineComponent({
  setup () {
    const { appConfig, setAppConfig } = useAppConfig()
    const colorSchemeList = [
      {
        color: appConfig.value.colors.color.primary,
        text: appConfig.value.colors.text.primary,
        label: 'Default'
      },
      { color: '#fbdace', text: '#795548', label: 'Wood' },
      { color: '#b2ddc3', text: '#879d9b', label: 'Forest' },
      { color: '#ffeacb', text: '#ff9800', label: 'Orange' }
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

    return () => (
      <LctCard title='Dynamic Theme' elevated withMargin>
        <div>
          {
            colorSchemeList.map(item => (
              <LctBtn
                onClick={() => setAppTheme(item.color, item.text)}
                transparent={appConfig.value.colors.color.primary !== item.color}
              >{item.label}</LctBtn>
            ))
          }
        </div>
      </LctCard>
    )
  }
})

export {
  DynamicThemeShowcase
}
