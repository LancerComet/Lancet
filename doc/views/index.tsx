import { defineComponent } from 'vue'

import lancetLogoImg from '../assets/lancet-logo.png'
import style from './index.module.styl'

const IndexPage = defineComponent({
  setup () {
    return () => (
      <div class={style.indexPage}>
        <div>
          <img src={lancetLogoImg} width='300' />

          <div>
            <h1>
              <span>Lancet</span>
              <br/>
              <small>(Material Design + Vue) * 3</small>
            </h1>
            <p>Building Material Design 3 App by using Vue 3.</p>
          </div>
        </div>
      </div>
    )
  }
})

export {
  IndexPage
}
