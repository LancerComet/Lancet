import Color from 'color'
import { prominent } from 'color.js'
import { defineComponent } from 'vue'
import { LctBtn } from '../../../../lib'

import { useCustomTheme } from '../../../hooks/theme'

import style from './select-image.module.styl'

const SelectImage = defineComponent({
  setup () {
    const { setAppTheme, addTheme } = useCustomTheme()
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
      <div class={style.selectImage}>
        <LctBtn onClick={selectImage}>Get the color from an image</LctBtn>
      </div>
    )
  }
})

export {
  SelectImage
}
