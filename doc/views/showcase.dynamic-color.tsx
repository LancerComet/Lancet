import Color from 'color'
import { prominent } from 'color.js'
import { defineComponent } from 'vue'

import { LctBtn, LctCard, LctCardContent, LctMica } from '../../lib'
import { useCustomTheme } from '../hooks/theme'

import style from './showcase.dynamic-color.module.styl'

const DynamicColor = defineComponent({
  setup () {
    const { isCurrentColor, setAppTheme, colorSchemeList, addTheme } = useCustomTheme()
    let customImage = 1

    const selectImage = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = async () => {
        const file = input.files?.[0]
        if (!file) {
          return
        }
        const url = URL.createObjectURL(file)
        const colorObjs = (await prominent(url, { amount: 10 }) as (number[])[])
          .map(rgb => new Color(rgb))
          .sort((a, b) => a.lightness() - b.lightness())
          .filter(item => {
            const lightness = item.lightness()
            return lightness >= 5 && lightness <= 85
          })

        const lightestColor = colorObjs[colorObjs.length - 1]
        const darkestColor = colorObjs[0]
        const color = lightestColor.hex()
        const textColor = darkestColor.hex()
        setAppTheme(color, textColor)
        addTheme(color, textColor, '🔨 Custom ' + customImage)
        customImage++
      }
      input.click()
    }

    return () => (
      <div class={style.dynamicColorShowcase}>
        <LctCard overHidden radius={28}>
          <LctMica>
            <LctCardContent>
              <h1>Color Theming</h1>
            </LctCardContent>
          </LctMica>
        </LctCard>

        <LctCard withMargin>
         <LctCardContent>
           <div>
             <p>Select your favourite theme by click the buttons below.</p>
             <div class={style.buttonList}>
               {
                 colorSchemeList.value.map(item => (
                   <LctBtn
                     onClick={() => setAppTheme(item.color, item.text)}
                     text={!isCurrentColor(item.color)}
                   >{item.label}</LctBtn>
                 ))
               }
             </div>
           </div>

           <div>
             <p>Or, you decide!</p>
             <div class={style.buttonList}>
               <LctBtn onClick={selectImage}>Get the theme color from an image</LctBtn>
             </div>
           </div>
         </LctCardContent>
        </LctCard>
      </div>
    )
  }
})

export {
  DynamicColor
}
