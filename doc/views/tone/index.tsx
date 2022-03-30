import { defineComponent } from 'vue'

import { LctCard, LctCardContent } from '../../../lib'

import Content from './index.mdx'

const DynamicColor = defineComponent({
  setup () {
    return () => (
      <div>
        <Content />

      </div>
    )
  }
})

export {
  DynamicColor
}
