import { defineComponent } from 'vue'
import { LctBtn } from '../../lib'
import { useCustomTheme } from '../hooks/theme'

import style from './action-bar.module.styl'

const ActionBar = defineComponent({
  setup () {
    const { isCurrentColor, setAppTheme, colorSchemeList } = useCustomTheme()

    return () => (
      <div class={style.actionBar}>
        <div>Lancet</div>
        <div>
          {
            colorSchemeList.map(item => (
              <LctBtn
                class={style.actionButton}
                onClick={() => setAppTheme(item.color, item.text)}
                transparent={!isCurrentColor(item.color)}
                circle={50}
              >{item.label}</LctBtn>
            ))
          }
        </div>
      </div>
    )
  }
})

export {
  ActionBar
}
