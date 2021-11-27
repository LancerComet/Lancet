import { defineComponent } from 'vue'
import { LctBtn, LctColorScheme, LctCard, LctMica, LctCardContent, LctIcon } from '../../lib'

import style from './showcase.button.module.styl'

const ButtonShowcase = defineComponent({
  setup () {
    return () => (
      <div class={style.buttonShowcase}>
        <LctCard overHidden radius={28} withMargin>
          <LctMica>
            <LctCardContent>
              <h1>Button</h1>
              <p>Basic button component.</p>
            </LctCardContent>
          </LctMica>
        </LctCard>

        <LctCard withMargin>
          <LctCardContent>
            <div class={style.showcaseSection}>
              <h6>Tonal (Default)</h6>
              <LctBtn>Primary</LctBtn>
              <LctBtn color={LctColorScheme.Warning}>Warning</LctBtn>
              <LctBtn color={LctColorScheme.Error}>Error</LctBtn>
              <LctBtn color={LctColorScheme.Success}>Success</LctBtn>
            </div>

            <div class={style.showcaseSection}>
              <h6>Outlined</h6>
              <LctBtn outlined>Primary</LctBtn>
              <LctBtn color={LctColorScheme.Warning} outlined>Warning</LctBtn>
              <LctBtn color={LctColorScheme.Error} outlined>Error</LctBtn>
              <LctBtn color={LctColorScheme.Success} outlined>Success</LctBtn>
            </div>

            <div class={style.showcaseSection}>
              <h6>Text Button</h6>
              <LctBtn text>Primary</LctBtn>
              <LctBtn text color={LctColorScheme.Success}>Success</LctBtn>
            </div>

            <div class={style.showcaseSection}>
              <h6>Filled</h6>
              <p>Filled-style buttons use the primary text color as its background, the white color as its text color.</p>
              <LctBtn filled>Primary</LctBtn>
              <LctBtn color={LctColorScheme.Warning} filled>Warning</LctBtn>
              <LctBtn color={LctColorScheme.Error} filled>Error</LctBtn>
              <LctBtn color={LctColorScheme.Success} filled>Success</LctBtn>
            </div>

            <div class={style.showcaseSection}>
              <h6>Loading</h6>
              <LctBtn loading>Loading</LctBtn>
              <LctBtn loading outlined>Loading</LctBtn>
              <LctBtn loading color={LctColorScheme.Warning}>Loading</LctBtn>
              <LctBtn loading color={LctColorScheme.Error}>Loading</LctBtn>
              <LctBtn loading color={LctColorScheme.Success}>Loading</LctBtn>
              <LctBtn loading text>Loading</LctBtn>
              <LctBtn loading filled>Loading</LctBtn>
              <LctBtn loading circle={50}/>
            </div>

            <div class={style.showcaseSection}>
              <h6>Disabled</h6>
              <div>
                <LctBtn disabled>Primary</LctBtn>
                <LctBtn disabled text>Text</LctBtn>
                <LctBtn loading disabled>Loading</LctBtn>
                <LctBtn loading outlined disabled>Loading</LctBtn>
              </div>
            </div>

            <div class={style.showcaseSection}>
              <h6>Circle</h6>
              <div>
                <LctBtn circle={50}>
                  <LctIcon>home</LctIcon>
                </LctBtn>
                <LctBtn circle={50} outlined>
                  <LctIcon>home</LctIcon>
                </LctBtn>
                <LctBtn circle={50} filled>
                  <LctIcon>home</LctIcon>
                </LctBtn>
                <LctBtn circle={50} text>
                  <LctIcon>home</LctIcon>
                </LctBtn>
              </div>
            </div>
          </LctCardContent>
        </LctCard>
      </div>
    )
  }
})

export {
  ButtonShowcase
}
