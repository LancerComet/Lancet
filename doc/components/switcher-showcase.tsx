import { defineComponent, ref } from 'vue'
import { LctCard, LctSwitcher } from '../../lib'

const SwitcherShowcase = defineComponent({
  setup () {
    const selected = ref(false)
    const loading = ref(false)
    const disabled = ref(false)
    const name = ref('John Smith')

    return () => (
      <LctCard title='Switcher' elevated withMargin>
        <div>
          <LctSwitcher v-model={selected.value} style='vertical-align: middle'/>
          <span style='vertical-align: middle'>Selected: {selected.value.toString()}</span>
        </div>

        <div>
          <LctSwitcher v-model={loading.value} loading={true} style='vertical-align: middle'/>
          <span style='vertical-align: middle'>Loading</span>
        </div>

        <div>
          <LctSwitcher v-model={disabled.value} disabled={true} style='vertical-align: middle'/>
          <span style='vertical-align: middle'>Disabled</span>
        </div>

        <div>
          <LctSwitcher v-model={name.value} trueValue={'John Smith'} falseValue={'LancerComet'} style='vertical-align: middle'/>
          <span style='vertical-align: middle'>Custom binding: {name.value}</span>
        </div>
      </LctCard>
    )
  }
})

export {
  SwitcherShowcase
}
