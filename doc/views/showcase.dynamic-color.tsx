import { defineComponent } from 'vue'
import { LctBtn, LctCard, LctCardContent, LctMica } from '../../lib'
import { useCustomTheme } from '../hooks/theme'

import style from './showcase.dynamic-color.module.styl'

const DynamicColor = defineComponent({
  setup () {
    const { isCurrentColor, setAppTheme, colorSchemeList } = useCustomTheme()

    return () => (
      <div class={style.dynamicColorShowcase}>
        <LctCard overHidden radius={28} withMargin>
          <LctMica>
            <LctCardContent>
              <h1>Dynamic Color</h1>
              <p>Select your favourite theme by click the buttons below.</p>
            </LctCardContent>
          </LctMica>
        </LctCard>

        <LctCard withMargin>
         <LctCardContent>
           <div class={style.buttonList}>
             {
               colorSchemeList.map(item => (
                 <LctBtn
                   onClick={() => setAppTheme(item.color, item.text)}
                   text={!isCurrentColor(item.color)}
                 >{item.label}</LctBtn>
               ))
             }
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
