import { defineComponent } from 'vue'
import { LctBtn, LctCard, LctCardContent, LctCardTitle } from '../../lib'
import { useCustomTheme } from '../hooks/theme'

const DynamicThemeShowcase = defineComponent({
  setup () {
    const { isCurrentColor, setAppTheme, colorSchemeList } = useCustomTheme()

    return () => (
      <LctCard withMargin elevated>
        <LctCardTitle>Dynamic Theme</LctCardTitle>
        <LctCardContent>
          {
            colorSchemeList.map(item => (
              <LctBtn
                onClick={() => setAppTheme(item.color, item.text)}
                transparent={!isCurrentColor(item.color)}
              >{item.label}</LctBtn>
            ))
          }
        </LctCardContent>
      </LctCard>
    )
  }
})

export {
  DynamicThemeShowcase
}
