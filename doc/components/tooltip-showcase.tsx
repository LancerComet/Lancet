import { defineComponent } from 'vue'
import { LctBtn, LctCard, LctTooltips } from '../../lib'

const TooltipShowcase = defineComponent({
  setup () {
    const slots = {
      tips: () => (
        <span>Test</span>
      )
    }

    return () => (
      <LctCard title='Tooltip' withMargin>
        <div>
          <LctTooltips v-slots={slots}>
            <LctBtn >Top</LctBtn>
          </LctTooltips>
          <LctTooltips tips={'11111'} position={'left'}>
            <LctBtn>Left</LctBtn>
          </LctTooltips>
          <LctTooltips v-slots={slots} position={'right'}>
            <LctBtn>Right</LctBtn>
          </LctTooltips>
          <LctTooltips v-slots={slots} position={'bottom'}>
            <LctBtn>Bottom</LctBtn>
          </LctTooltips>
        </div>
      </LctCard>
    )
  }
})

export {
  TooltipShowcase
}
