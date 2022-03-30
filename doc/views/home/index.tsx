import { defineComponent } from 'vue'

import Content from './index.mdx'
import style from './index.module.styl'

const IndexPage = defineComponent({
  setup () {
    return () => (
      <div class={style.indexPage}>
        <Content />
      </div>
    )
  }
})

export {
  IndexPage
}
