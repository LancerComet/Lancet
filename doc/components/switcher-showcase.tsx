import { defineComponent, ref } from 'vue'
import { LancetColorScheme, LctCard, LctSwitcher } from '../../lib'

const spanStyle = {
  display: 'inline-block',
  width: '120px',
  'vertical-align': 'middle'
}

const SwitcherShowcase = defineComponent({
  setup () {
    const selected = ref(false)
    const loading = ref(false)
    const disabled = ref(false)
    const name = ref('John Smith')
    const themes = ref(true)

    return () => (
      <LctCard title='Switcher' elevated withMargin>
        <div>
          <span style={spanStyle}>Selected: {selected.value.toString()}</span>
          <LctSwitcher v-model={selected.value} style='vertical-align: middle'/>
        </div>

        <div>
          <span style={spanStyle}>Loading</span>
          <LctSwitcher v-model={loading.value} loading={true} style='vertical-align: middle'/>
        </div>

        <div>
          <span style={spanStyle}>Disabled</span>
          <LctSwitcher modelValue={true} disabled={true} style='vertical-align: middle'/>
          <LctSwitcher v-model={disabled.value} disabled={true} style='vertical-align: middle'/>
        </div>

        <div>
          <LctSwitcher v-model={name.value} trueValue={'John Smith'} falseValue={'LancerComet'} style='vertical-align: middle'/>
          <span style='vertical-align: middle'>Custom binding: {name.value}</span>
        </div>

        <div>
          <LctSwitcher v-model={themes.value} style='vertical-align: middle' color={LancetColorScheme.Primary}/>
          <LctSwitcher v-model={themes.value} style='vertical-align: middle' color={LancetColorScheme.Success}/>
          <LctSwitcher v-model={themes.value} style='vertical-align: middle' color={LancetColorScheme.Warning}/>
          <LctSwitcher v-model={themes.value} style='vertical-align: middle' color={LancetColorScheme.Error}/>
        </div>
      </LctCard>
    )
  }
})

export {
  SwitcherShowcase
}
