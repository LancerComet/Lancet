import { defineComponent } from 'vue'
import { LctBtn, LctCard, LancetColorScheme } from '../../lib'

const ButtonShowcase = defineComponent({
  setup () {
    return () => (
      <LctCard title='按钮' elevated withMargin>
        <div>
          <LctBtn>Default</LctBtn>
          <LctBtn color={LancetColorScheme.Warning}>Warning</LctBtn>
          <LctBtn color={LancetColorScheme.Error}>Error</LctBtn>
          <LctBtn color={LancetColorScheme.Success}>Success</LctBtn>
          <LctBtn outlined>Default</LctBtn>
          <LctBtn color={LancetColorScheme.Warning} outlined>Warning</LctBtn>
          <LctBtn color={LancetColorScheme.Error} outlined>Error</LctBtn>
          <LctBtn color={LancetColorScheme.Success} outlined>Success</LctBtn>
          <LctBtn transparent>Transparent</LctBtn>
        </div>
        <div>
          <LctBtn loading>Loading</LctBtn>
          <LctBtn loading disabled>Loading</LctBtn>
          <LctBtn loading outlined>Loading</LctBtn>
          <LctBtn loading outlined disabled>Loading</LctBtn>
          <LctBtn loading color={LancetColorScheme.Warning}>Loading</LctBtn>
          <LctBtn loading color={LancetColorScheme.Error}>Loading</LctBtn>
          <LctBtn loading color={LancetColorScheme.Success}>Loading</LctBtn>
          <LctBtn loading transparent>Loading</LctBtn>
        </div>
      </LctCard>
    )
  }
})

export {
  ButtonShowcase
}
