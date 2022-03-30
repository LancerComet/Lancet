import { defineComponent } from 'vue'

const LctList = defineComponent({
  name: 'LctList',

  setup (props, { slots }) {
    return () => (
      <div role='list'>{ slots.default?.() }</div>
    )
  }
})

export {
  LctList
}
