import { defineComponent } from 'vue'
import { LctCard } from '../../lib'

const TypographyShowcase = defineComponent({
  setup () {
    return () => (
      <LctCard title='Typography' withMargin>
        <h1>Display Large</h1>
        <h2>Display Medium</h2>
        <h3>Display Small</h3>
        <h4>Headline Large</h4>
        <h5>Headline Medium</h5>
        <h6>Headline Small</h6>
      </LctCard>
    )
  }
})

export {
  TypographyShowcase
}
