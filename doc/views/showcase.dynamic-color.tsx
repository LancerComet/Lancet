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
        <LctCard overHidden radius={28} withMargin>
          <LctMica>
            <LctCardContent>
              <h1>Tone</h1>
            </LctCardContent>
          </LctMica>
        </LctCard>

        <LctCard withMargin>
          <LctCardContent>
            <h3>Let's have a different feeling</h3>
            <p>Please select a different color:</p>
            <div class={style.buttonList}>
              {
                colorSchemeList.value.map(item => (
                  <LctBtn
                    onClick={() => setAppTheme(item.tonal, item.text)}
                    text={!isCurrentColor(item.tonal)}
                  >{item.label}</LctBtn>
                ))
              }
            </div>
            <p>In the Material Design 3, the color has become the first class citizen of the visual elements. So it's kinda cool to have the theme switching feature in the app.</p>
            <p>If you have ever used Android 12, you must have found that the tone is based on your wallpaper, as well as Windows 11.</p>
            <p>So let's try this 👇:</p>
            <div class={style.buttonList}>
              <LctBtn onClick={selectImage}>Get the color from an image</LctBtn>
            </div>
            <p>The result is based on your image, so there would be some weird color patterns anyway.</p>
          </LctCardContent>
        </LctCard>

        <LctCard withMargin>
          <LctCardContent>
            <h3>Color type</h3>
            <p>There are two kind of colors defined in Lancet:</p>
            <ul>
              <li>Tonal: Used as the theme color by many components, like the background of a button.</li>
              <li>Text: The text color of your app, just what you see right now.</li>
            </ul>
            <p>You can change them at anytime to have a different looking.</p>
            <p>Each type has four color schemes defined. Check the next section for more.</p>
          </LctCardContent>
        </LctCard>

        <LctCard withMargin>
          <LctCardContent>
            <h3>Color Scheme</h3>
            <p>There are four color schemes defined in Lancet:</p>
            <ul>
              <li>Primary: The main color. This color is used in regular situations.</li>
              <li>Warn: Used in the situation which warns the user by some components.</li>
              <li>Error: Used in the situation which tells the user an error has come out.</li>
              <li>Success: Used in the situation which tells the user something has been done successfully.</li>
            </ul>
            <p>Most of the components use <b>Primary</b> as its main color by default. However there are some components use a different one, such as a warning or error toast.</p>
            <p>The good news is, the color scheme of most components can be changed:</p>
            <div>
              <pre>{
                '// A primary color button by default:\n' +
                '<LctBtn />\n' +
                '\n' +
                '// Now you have an error color button:\n' +
                '<LctBtn color={LctColorScheme.Error} />'
              }</pre>
            </div>
          </LctCardContent>
        </LctCard>

        <LctCard>
          <LctCardContent>
            <h3>Change the color</h3>
            <p>You can change the Primary, Warn, Error, Success Color to have a different looking just like what you have seen in the first section.</p>
            <p>But for now, you can't define more themes and mix them up.</p>
          </LctCardContent>
        </LctCard>
      </div>
    )
  }
})

export {
  DynamicColor
}
