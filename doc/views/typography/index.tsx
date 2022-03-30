import { defineComponent } from 'vue'
import Content from './index.mdx'

const Typography = defineComponent({
  setup () {
    return () => (
      <Content />
    )
  }
})

export {
  Typography
}
