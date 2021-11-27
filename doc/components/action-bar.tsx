import { defineComponent } from 'vue'

import { LctBtn } from '../../lib'
import style from './action-bar.module.styl'
import { LancetLogo } from './lancet-logo'

const ActionBar = defineComponent({
  setup () {
    return () => (
      <div class={style.actionBar}>
        <LctBtn class={style.actionButton} text circle={50}>
          <LancetLogo width={20}/>
        </LctBtn>
      </div>
    )
  }
})

export {
  ActionBar
}
