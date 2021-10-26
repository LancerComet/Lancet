import { defineComponent, inject, provide } from 'vue'
import { randomString } from '../../utils/random'

const INJECT_KEY = 'lct-outsider-' + randomString().toLocaleLowerCase()

const OutsideSlotProvider = defineComponent({
  setup (props, { slots }) {
    const id = 'lct-outsider-' + randomString().toLocaleLowerCase()
    const element = document.createElement('div')
    element.id = id
    document.body.appendChild(element)
    provide<string>(INJECT_KEY, id)
    return () => (
      <div>{ slots.default?.() }</div>
    )
  }
})

const useOutsider = () => {
  const id = inject<string>(INJECT_KEY, '')
  return {
    id: '#' + id
  }
}

export {
  OutsideSlotProvider,
  useOutsider
}
