import { defineComponent } from 'vue'
import { LctBtn } from '../../../../lib'
import { useCustomTheme } from '../../../hooks/theme'

import style from './theme-list.module.styl'

const ThemeList = defineComponent({
  setup () {
    const { isCurrentColor, setAppTheme, colorSchemeList } = useCustomTheme()

    return () => (
      <div class={style.themeList}>
        {
          colorSchemeList.value.map(item => (
            <LctBtn
              onClick={() => setAppTheme(item.tonal, item.text)}
              text={!isCurrentColor(item.tonal)}
            >{item.label}</LctBtn>
          ))
        }
      </div>
    )
  }
})

export {
  ThemeList
}
