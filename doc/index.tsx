import 'reflect-metadata'

import { defineComponent, createApp } from 'vue'

import 'material-icons/iconfont/material-icons.css'

import { Lancet, LctApp } from '../lib'
import { ButtonShowcase } from './components/button-showcase'
import { DialogShowcase } from './components/dialog-showcase'
import { FormShowcase } from './components/form-showcase'
import { ProgressShowcase } from './components/progress-showcase'
import { SwitcherShowcase } from './components/switcher-showcase'
import { TableShowcase } from './components/table-showcase'
import { TabsShowcase } from './components/tabs-showcase'
import { ToastShowcase } from './components/toast-showcase'
import { TooltipShowcase } from './components/tooltip-showcase'
import { TypographyShowcase } from './components/typography-showcase'
import style from './index.module.styl'

const TestPage = defineComponent({
  name: 'TestPage',
  setup () {
    return () => (
      <LctApp>
        <div class={style.testPage}>
          <div>
            <h1>Lancet</h1>
            <p>A little tiny Vue 3 UI component library.</p>
          </div>

          <TypographyShowcase />
          <ButtonShowcase />
          <SwitcherShowcase />
          <TabsShowcase />
          <FormShowcase />
          <TableShowcase />
          <DialogShowcase />
          <ToastShowcase />
          <ProgressShowcase />
          <TooltipShowcase />
        </div>
      </LctApp>
    )
  }
})

const app = createApp(TestPage)
app.use(Lancet)
app.mount('#app')
