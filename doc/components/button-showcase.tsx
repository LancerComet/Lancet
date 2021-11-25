import { defineComponent } from 'vue'
import { LctBtn, LctCard, LancetColorScheme } from '../../lib'

const ButtonShowcase = defineComponent({
  setup () {
    return () => (
      <LctCard title='Button' elevated withMargin>
        <div>
          <h6>Default</h6>
          <LctBtn>Default</LctBtn>
          <LctBtn color={LancetColorScheme.Warning}>Warning</LctBtn>
          <LctBtn color={LancetColorScheme.Error}>Error</LctBtn>
          <LctBtn color={LancetColorScheme.Success}>Success</LctBtn>
        </div>

        <div>
          <h6>Outlined</h6>
          <LctBtn outlined>Default</LctBtn>
          <LctBtn color={LancetColorScheme.Warning} outlined>Warning</LctBtn>
          <LctBtn color={LancetColorScheme.Error} outlined>Error</LctBtn>
          <LctBtn color={LancetColorScheme.Success} outlined>Success</LctBtn>
        </div>

        <div>
          <h6>Transparent</h6>
          <LctBtn transparent>Transparent</LctBtn>
          <LctBtn transparent color={LancetColorScheme.Success}>Transparent</LctBtn>
        </div>

        <div>
          <h6>Loading</h6>
          <LctBtn loading>Loading</LctBtn>
          <LctBtn loading outlined>Loading</LctBtn>
          <LctBtn loading color={LancetColorScheme.Warning}>Loading</LctBtn>
          <LctBtn loading color={LancetColorScheme.Error}>Loading</LctBtn>
          <LctBtn loading color={LancetColorScheme.Success}>Loading</LctBtn>
          <LctBtn loading transparent>Loading</LctBtn>
        </div>

        <div>
          <h6>Disabled</h6>
          <div>
            <LctBtn disabled>Primary</LctBtn>
            <LctBtn disabled transparent>Transparent</LctBtn>
            <LctBtn loading disabled>Loading</LctBtn>
            <LctBtn loading outlined disabled>Loading</LctBtn>
          </div>
        </div>
      </LctCard>
    )
  }
})

export {
  ButtonShowcase
}
