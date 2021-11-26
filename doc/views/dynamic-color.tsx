import { defineComponent } from 'vue'
import { LctBtn } from '../../lib'
import { useCustomTheme } from '../hooks/theme'

const DynamicColor = defineComponent({
  setup () {
    const { isCurrentColor, setAppTheme, colorSchemeList } = useCustomTheme()

    return () => (
      <article>
        <h1>Dynamic Color</h1>
        <div>
          <p>Select your favourite theme by click the buttons below:</p>
          <div>
            {
              colorSchemeList.map(item => (
                <LctBtn
                  onClick={() => setAppTheme(item.color, item.text)}
                  transparent={!isCurrentColor(item.color)}
                >{item.label}</LctBtn>
              ))
            }
          </div>
        </div>
      </article>
    )
  }
})

export {
  DynamicColor
}
