import { defineComponent } from 'vue'

import { LctBtn } from '../../lib'
import style from './action-bar.module.styl'

const ActionBar = defineComponent({
  setup () {
    return () => (
      <div class={style.actionBar}>
        <LctBtn class={style.actionButton} text>Lancet</LctBtn>
      </div>
    )
  }
})

export {
  ActionBar
}
