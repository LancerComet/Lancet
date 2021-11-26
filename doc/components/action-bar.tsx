import { defineComponent } from 'vue'

import style from './action-bar.module.styl'

const ActionBar = defineComponent({
  setup () {
    return () => (
      <div class={style.actionBar}>
        <div>Lancet</div>
      </div>
    )
  }
})

export {
  ActionBar
}
