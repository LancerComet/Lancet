import { computed, defineComponent, ref } from 'vue'

import { LctCard, LctTab, LctTabPanel, LctTabPanels, LctTabs } from '../../lib'

const TabsShowcase = defineComponent({
  setup () {
    const a = ref(1)
    computed(() => {
      console.log(a.value)
      return 0
    })
    const tabs = [{
      label: 'Tab 1',
      value: 1,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      color: 'blue'
    }, {
      label: 'Tab 2',
      value: 2,
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy',
      color: 'red'
    }, {
      label: 'Tab 3',
      value: 3,
      description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',
      color: 'grey'
    }]

    return () => (
      <LctCard withMargin padding={0} elevated>
         <LctTabs v-model={a.value}>
          {tabs.map(item => <LctTab value={item.value}>{item.label}</LctTab>)}
        </LctTabs>
        <LctTabPanels v-model={a.value}>
          {tabs.map(item => <LctTabPanel value={item.value}>{item.description}</LctTabPanel>)}
        </LctTabPanels>
      </LctCard>
    )
  }
})

export {
  TabsShowcase
}
