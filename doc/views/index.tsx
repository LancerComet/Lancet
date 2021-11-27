import { defineComponent } from 'vue'

import { LancetLogo } from '../components/lancet-logo'
import style from './index.module.styl'

const IndexPage = defineComponent({
  setup () {
    return () => (
      <div class={style.indexPage}>
        <div>
          <LancetLogo width={300}/>

          <div>
            <h1>
              <span>Lancet</span>
              <br/>
              <small>(Material Design + Vue) * 3</small>
            </h1>
            <p>Yet another Material Design like Vue 3 UI Components library.</p>
          </div>
        </div>
      </div>
    )
  }
})

export {
  IndexPage
}
